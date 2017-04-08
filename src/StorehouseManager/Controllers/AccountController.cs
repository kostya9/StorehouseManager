using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using StorehouseManager.Models;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager _userManager;

        public AccountController(UserManager userManager)
        {
            _userManager = userManager;
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterModel model)
        {
            User user;
            try
            {
                user = _userManager.Register(model.GenerateUser(), model.Password);
            }
            catch (ArgumentException)
            {
                ModelState.AddModelError(string.Empty,
                    "The username or password are incorrect, or username already exists");
                return View();
            }

            return RedirectToAction("Login");


        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = _userManager.GetUser(model.UserName, model.Password);
            if (user == null)
            {
                ModelState.AddModelError("User", "Incorrect username or password");
                return Login();
            }
            await SignInAsync(user);
            return RedirectToAction("Index", "StorehouseOwner");

        }

        private async Task SignInAsync(User user)
        {
            var principal = _userManager.GetPrincipal(user);
            await HttpContext.Authentication.SignInAsync(UserManager.AuthenticationScheme, principal);
        }
    }
}