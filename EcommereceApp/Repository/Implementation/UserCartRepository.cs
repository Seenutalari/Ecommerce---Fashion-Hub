using EcommereceApp.DatabaseContext;
using EcommereceApp.Entites.DTOs.CartItemDto;
using EcommereceApp.Entites.Models;
using EcommereceApp.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace EcommereceApp.Repository.Implementation
{
    public class UserCartRepository : ICartRepository
    {
        private readonly AppDbContext dbContext;

        public UserCartRepository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddItemToUserCart(int productId, int quantity, string userEmail)
        {
            // Retrieve the user's cart based on the userId
            var user = dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            if (user == null)
            {
                // User not found, handle the error
                throw new Exception($"User with email '{userEmail}' not found.");
            }
            var currentUserId = user.Id;
            var userCart = dbContext.Carts.Include(c => c.Items)
                .FirstOrDefault(c => c.UserId == currentUserId);

            if (userCart == null)
            {
                // If the user doesn't have a cart yet, create a new cart for the user
                userCart = new Cart { UserId = currentUserId, Items = new List<CartItem>() };
                dbContext.Carts.Add(userCart);
            }

            var product = dbContext.Products.Find(productId);
            var price = product.Price;
            var totalPrice = price * quantity;
            var imgUrl = product.ImgUrl;

            // Check if the product is already in the user's cart
            var existingCartItem = userCart.Items.FirstOrDefault(ci => ci.ProductId == productId);
            if (existingCartItem != null)
            {
                // Update the existing cart item
                existingCartItem.Quantity += quantity;
                existingCartItem.TotalPrice = existingCartItem.Quantity * price;
                existingCartItem.ImageUrl = imgUrl;
                dbContext.Entry(existingCartItem).State = EntityState.Modified;
            }
            else
            {
                // Add the new item to the user's cart
                userCart.Items.Add(new CartItem { ProductId = productId, Quantity = quantity, TotalPrice = totalPrice, ImageUrl = imgUrl });
            }

            dbContext.SaveChanges();
        }

        public void ClearUserCart(string userEmail)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            var currentuserId = user.Id;
            Cart userCart = dbContext.Carts.Include(c => c.Items).FirstOrDefault(c => c.UserId == currentuserId);

            if (userCart != null)
            {
                userCart.Items.Clear();
                dbContext.SaveChanges();
            }
        }

        public List<CartItemDto> GetAllCartItemsForUser(string userEmail)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            if (user == null)
            {
                // Handle the case where the user is not found
                return new List<CartItemDto>();
            }

            var currentUserId = user.Id;

            var userCart = dbContext.Carts
                .Include(c => c.Items)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefault(c => c.UserId == currentUserId);

            if (userCart != null)
            {
                return userCart.Items.Select(ci => new CartItemDto
                {
                    Id = ci.Id,
                    ProductId = ci.ProductId,
                    ProductDescription = ci.Product.ProductDescription,
                    ProductBrand = ci.Product.Brand,
                    ProductPrice = ci.Product.Price,
                    Quantity = ci.Quantity,
                    TotalPrice = ci.TotalPrice,
                    ImageUrl = ci.Product.ImgUrl
                }).ToList();
            }
            else
            {
                return new List<CartItemDto>();
            }
        }


        public void RemoveItemFromCartById(int productId, string userEmail)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            var currentuserId = user.Id;
            var cartItem = dbContext.Items.FirstOrDefault(c => c.Product.Id == productId && c.Cart.UserId == currentuserId);
            if (cartItem != null)
            {
                dbContext.Items.Remove(cartItem);
                dbContext.SaveChanges();
            }
        }
    }
}
