using EcommereceApp.Entites.DTOs.AdminDto;
using EcommereceApp.Entites.DTOs.CategoryDto;
using EcommereceApp.Entites.DTOs.OrdersDto;
using EcommereceApp.Entites.DTOs.ProductDto;
using EcommereceApp.Entites.Models;

namespace EcommereceApp.Repository.Interface
{
    public interface IAdminRepository
    {
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<IEnumerable<OrderDto>> GetUserOrdersByIdAsync(int userId);
        Task<IEnumerable<ResponseProductDto>> GetAllProducts();
        Task<IEnumerable<CategoryDto>> GetAllCategory();
        Task<ResponseProductDto> GetByIdProducts(int id);
        Task<RequestProductDto> AddProducts(RequestProductDto requestProductDto);
        Task<AddCategoryDto> AddCategory(AddCategoryDto addCategoryDto);
        Task<RequestProductDto> UpdateProducts(int id, RequestProductDto product);
        Task<RegisterAdminDto> Register(RegisterAdminDto registerAdminDto);
        Task<string> Login(LoginAdminDto loginAdminDto);
        Task<Product> DeleteProducts(int id);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetByIdUser(int id);
    }
}
