using EcommereceApp.Entites.DTOs.CartItemDto;

namespace EcommereceApp.Repository.Interface
{
    public interface ICartRepository
    {
        void AddItemToUserCart(int productId, int quantity, string userEmail);
        List<CartItemDto> GetAllCartItemsForUser(string userEmail);
        void ClearUserCart(string userEmail);
        void RemoveItemFromCartById(int productId, string userEmail);

    }
}
