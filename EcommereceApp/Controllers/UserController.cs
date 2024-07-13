using EcommereceApp.Entites.DTOs.UserDto;
using EcommereceApp.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommereceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _UserRepository;
        public UserController(IUserRepository userRepository)
        {
            _UserRepository = userRepository;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registeruserdto)
        {
            var register = await _UserRepository.Register(registeruserdto);
            if (register == null)
            {
                return BadRequest("Email already exists");
            }
            return Ok("Successfully Registered");
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var login = await _UserRepository.Login(loginUserDto);
            if (login == null)
            {
                return BadRequest("Invalid Email and Password");
            }
            return Ok(login);
        }

        [HttpPut("updatedetails/{userEmail}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Update(string userEmail, [FromBody] UpdateUserDto user)
        {
            var up_User = await _UserRepository.UpdateUser(userEmail, user);
            return Ok(new { message = "Updated successfully." });
        }

        [HttpGet("GetUserDetails/{userEmail}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserDetails(string userEmail)
        {
            var details = await _UserRepository.GetUserDetails(userEmail);
            return Ok(details);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> getCategories()
        {
            var log = await _UserRepository.GetCategories();
            return Ok(log);
        }
        [HttpGet("getProductsByCategories/{categoryId}/products")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> getProductsByCategories(int categoryId)
        {
            var log = await _UserRepository.GetProductsByCategory(categoryId);
            return Ok(log);
        }

        [HttpGet("SearchByBrand/{brandName}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> SearchByBrand(string brandName)
        {
            var brand = await _UserRepository.SearchByBrand(brandName);
            if (brand == null)
            {
                return BadRequest();
            }
            return Ok(brand);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "User")]

        public async Task<IActionResult> GetAllProduct()
        {
            var log = await _UserRepository.GetAllProducts();
            return Ok(log);
        }

        [HttpPost("CheckOut/{userEmail}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CheckOut(string userEmail)
        {
            var checkout = await _UserRepository.CheckOut(userEmail);
            if (checkout == null)
            {
                return BadRequest("Cart is empty. Cannot create an order.");
            }
            return Ok(new { message = "Order placed successfully." });
        }
        [HttpGet("orders/{userEmail}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetOrdersByUserId(string userEmail)
        {
            var orders = await _UserRepository.GetOrdersByUserId(userEmail);
            return Ok(orders);
        }
        [HttpDelete("DeleteAccount/{userEmail}")]
        [Authorize(Roles = "User")]
        public IActionResult DeleteAccount(string userEmail)
        {
            _UserRepository.DeleteAccount(userEmail);
            return Ok(new { message = "Account Deleted Successfully." });

        }
    }
}
