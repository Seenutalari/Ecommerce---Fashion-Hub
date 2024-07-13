using EcommereceApp.Entites.DTOs.CategoryDto;
using EcommereceApp.Entites.DTOs.OrdersDto;
using EcommereceApp.Entites.DTOs.ProductDto;
using EcommereceApp.Entites.DTOs.UserDto;

namespace EcommereceApp.Repository.Interface
{
    public interface IUserRepository
    {

        Task<RegisterUserDto> Register(RegisterUserDto registeruserdto);
        Task<string> Login(LoginUserDto loginUserDto);
        Task<IEnumerable<ResponseProductDto>> GetAllProducts();
        Task<IEnumerable<ResponseProductDto>> GetProductsByCategory(int categoryId);
        Task<List<CategoryDto>> GetCategories();
        Task<IEnumerable<ResponseProductDto>> SearchByBrand(string brandName);
        Task<UpdateUserDto> UpdateUser(string userEmail, UpdateUserDto user);
        Task<UpdateUserDto> GetUserDetails(string userEmail);
        Task<string> CheckOut(string userEmail);
        void DeleteAccount(string userEmail);
        Task<IEnumerable<OrderItemDto>> GetOrdersByUserId(string userEmail);

    }
}
