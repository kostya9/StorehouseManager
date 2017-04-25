using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using StorehouseManager;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Authentication;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Domain.Goods.StateCommand;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            }); ;
            services.AddDbContext<EfDbContext>(options => options.UseSqlServer(Configuration["ConnectionString"], 
                opts => opts.MigrationsAssembly("StorehouseManager")));
            services.AddScoped<UserManager>();

            services.AddScoped<GoodsRepository>();
            services.AddScoped<GoodsTransitionRepository>();
            services.AddScoped<GoodsItemFilter>();

            services.AddScoped<AreaRepository>();
            services.AddScoped<GoodsTransitionRepository>();

            services.AddScoped<GoodsItemService>();

            services.AddScoped<StateChangeCommandFactory>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<User, UserProxy>();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }


            // Inti char-s
            using (var ctx = app.ApplicationServices.GetService<EfDbContext>())
            {
                var items = ctx.GoodsItems.Include(gi => gi.Characteristics).ToList().Where(gi => gi.Characteristics == null);
                foreach (var goodsItem in items)
                {
                    ctx.GoodsCharacteristics.Add(new GoodsCharacteristics(goodsItem.Id));
                }
                ctx.SaveChanges();
            }

            app.UseStaticFiles();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = UserManager.AuthenticationScheme,
                LoginPath = "/Account/Login",
                AccessDeniedPath = "/",
                AutomaticChallenge = true,
                AutomaticAuthenticate = true
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "StorehouseOwner",
                    template: "StorehouseOwner/{*path}",
                    defaults: new {controller = "StorehouseOwner", action = "Index"}
                );
            });
        }
    }
}

