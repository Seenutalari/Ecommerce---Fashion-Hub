using AutoMapper;
using EcommereceApp.DatabaseContext;
using EcommereceApp.Entites.DTOs.AdminDto;
using EcommereceApp.Entites.DTOs.CategoryDto;
using EcommereceApp.Entites.DTOs.OrdersDto;
using EcommereceApp.Entites.DTOs.ProductDto;
using EcommereceApp.Entites.Models;
using EcommereceApp.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcommereceApp.Repository.Implementation
{
    public class AdminRepository : IAdminRepository
        {
            private readonly IConfiguration _config;
            private readonly AppDbContext _dbContext;
            private readonly IMapper _mapper;

            public AdminRepository(IConfiguration config, AppDbContext dbContext, IMapper mapper)
            {
                _config = config;
                _dbContext = dbContext;
                _mapper = mapper;
            }

            public async Task<RequestProductDto> AddProducts(RequestProductDto requestProductDto)
            {
                var product = _mapper.Map<Product>(requestProductDto);
                var result = await _dbContext.Products.FirstOrDefaultAsync(p => p.ProductCode == requestProductDto.ProductCode);
                if (result != null)
                {
                    return null;
                }
                await _dbContext.Products.AddAsync(product);
                await _dbContext.SaveChangesAsync();
                var productDto = _mapper.Map<RequestProductDto>(product);
                return productDto;
            }
            public async Task<IEnumerable<ResponseProductDto>> GetAllProducts()
            {
                return await _dbContext.Products
                    .Select(p => _mapper.Map<ResponseProductDto>(p))
                    .ToListAsync();
            }
            public async Task<ResponseProductDto> GetByIdProducts(int id)
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
                var responseProductDto = _mapper.Map<ResponseProductDto>(product);
                return responseProductDto;
            }
            public async Task<string> Login(LoginAdminDto loginAdminDto)
            {
                var adminexist = await _dbContext.Admins.FirstOrDefaultAsync(u => u.UserName == loginAdminDto.UserName && u.Password == loginAdminDto.Password);
                if (adminexist == null)
                {
                    return null;
                }
                else
                {
                    var jwtTokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes("fneiVNVIEQAnvieqrnvqiepoAQNRVOWMVOENVEN");
                    var identity = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Role, "Admin"),
                    new Claim(ClaimTypes.Email, loginAdminDto.UserName)

                        });
                    var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = identity,
                        Expires = DateTime.Now.AddDays(1),
                        SigningCredentials = credentials
                    };
                    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                    return jwtTokenHandler.WriteToken(token);
                }
            }
            public async Task<RequestProductDto> UpdateProducts(int id, RequestProductDto product)
            {
                var up_pro = await _dbContext.Products.Where(n => n.Id == id).FirstOrDefaultAsync();
                if (up_pro == null)
                {
                    return null;
                }
                up_pro.Brand = product.Brand;
                up_pro.ProductCode = product.ProductCode;
                up_pro.ProductDescription = product.ProductDescription;
                up_pro.Price = product.Price;
                up_pro.ImgUrl = product.ImgUrl;

                await _dbContext.SaveChangesAsync();
                var updatedProductDto = _mapper.Map<RequestProductDto>(up_pro);
                return updatedProductDto;
            }


            public async Task<Product> DeleteProducts(int id)
            {
                var del = await _dbContext.Products.FirstOrDefaultAsync(n => n.Id == id);
                if (del == null)
                {
                    return null;
                }
                _dbContext.Products.Remove(del);
                await _dbContext.SaveChangesAsync();
                return del;
            }
            public async Task<IEnumerable<User>> GetAllUsers()
            {
                return await _dbContext.Users.ToListAsync();
            }
            public async Task<User> GetByIdUser(int id)
            {
                return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            }
            public async Task<RegisterAdminDto> Register(RegisterAdminDto registerAdminDto)
            {
                var admin = _mapper.Map<Admin>(registerAdminDto);
                var exist = await _dbContext.Admins.FirstOrDefaultAsync(u => u.UserName == registerAdminDto.UserName);
                if (exist != null)
                {
                    return null;
                }
                await _dbContext.Admins.AddAsync(admin);
                await _dbContext.SaveChangesAsync();
                var registeredAdminDto = _mapper.Map<RegisterAdminDto>(admin);
                return registeredAdminDto;
            }

            public async Task<AddCategoryDto> AddCategory(AddCategoryDto addCategoryDto)
            {
                var category = _mapper.Map<Category>(addCategoryDto);
                var result = await _dbContext.Categories.FirstOrDefaultAsync(p => p.CategoryName == addCategoryDto.CategoryName);
                if (result != null)
                {
                    return null;
                }
                _dbContext.Categories.Add(category);
                await _dbContext.SaveChangesAsync();
                var createdCategoryDto = _mapper.Map<AddCategoryDto>(category);
                return createdCategoryDto;
            }

            public async Task<IEnumerable<CategoryDto>> GetAllCategory()
            {
                return await _dbContext.Categories
                    .Select(p => _mapper.Map<CategoryDto>(p))
                .ToListAsync();
            }

            public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
            {
                var orders = await _dbContext.Order
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .ToListAsync();
                return _mapper.Map<IEnumerable<OrderDto>>(orders);
            }
            public async Task<IEnumerable<OrderDto>> GetUserOrdersByIdAsync(int userId)
            {
                var orders = await _dbContext.Order
                    .Where(o => o.UserId == userId)
                    .Include(o => o.User)
                    .Include(o => o.OrderItems)
                        .ThenInclude(oi => oi.Product)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<OrderDto>>(orders);
            }
        }
}
