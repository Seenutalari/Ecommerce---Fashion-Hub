using AutoMapper;
using EcommereceApp.Entites.DTOs.AdminDto;
using EcommereceApp.Entites.DTOs.CartItemDto;
using EcommereceApp.Entites.DTOs.CategoryDto;
using EcommereceApp.Entites.DTOs.OrdersDto;
using EcommereceApp.Entites.DTOs.ProductDto;
using EcommereceApp.Entites.DTOs.UserDto;
using EcommereceApp.Entites.Models;

namespace EcommereceApp.Mapping
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, LoginUserDto>().ReverseMap();
            CreateMap<User, UpdateUserDto>().ReverseMap();
            CreateMap<Admin, LoginAdminDto>().ReverseMap();
            CreateMap<Admin, RegisterAdminDto>().ReverseMap();
            CreateMap<Product, RequestProductDto>().ReverseMap();
            CreateMap<Product, ResponseProductDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, AddCategoryDto>().ReverseMap();
            CreateMap<CartItem, CartItemDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
        }
    }
}
