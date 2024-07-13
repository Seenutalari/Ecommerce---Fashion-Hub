using EcommereceApp.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommereceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }

        [HttpPost("AddItemToCart/{productId}/{quantity}/{userEmail}")]
        [Authorize(Roles = "User")]
        public IActionResult AddItemToCart(int productId, int quantity, string userEmail)
        {
            cartRepository.AddItemToUserCart(productId, quantity, userEmail);
            return Ok(new { message = "Item Added successfully." });
        }

        [HttpGet("GetAllCartItems/{userEmail}")]
        [Authorize(Roles = "User")]
        public ActionResult GetAllCartItems(string userEmail)
        {
            var cartItems = cartRepository.GetAllCartItemsForUser(userEmail);
            return Ok(cartItems);
        }
        [HttpDelete("ClearCart/{userEmail}")]
        [Authorize(Roles = "User")]
        public IActionResult ClearCart(string userEmail)
        {
            cartRepository.ClearUserCart(userEmail);
            return Ok(new { message = "Cart Cleared!" });
        }
        [HttpDelete("RemoveItemFromCart/{productId}/{userEmail}")]
        [Authorize(Roles = "User")]
        public IActionResult RemoveItemFromCart(int productId, string userEmail)
        {
            cartRepository.RemoveItemFromCartById(productId, userEmail);
            return Ok(new { message = "Item Removed from Cart" });
        }
    }
}
