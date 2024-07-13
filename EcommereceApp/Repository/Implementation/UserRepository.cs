using AutoMapper;
using EcommereceApp.DatabaseContext;
using EcommereceApp.Entites.DTOs.CategoryDto;
using EcommereceApp.Entites.DTOs.OrdersDto;
using EcommereceApp.Entites.DTOs.ProductDto;
using EcommereceApp.Entites.DTOs.UserDto;
using EcommereceApp.Entites.Models;
using EcommereceApp.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcommereceApp.Repository.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserRepository(IConfiguration config, AppDbContext dbContext, IMapper mapper)
        {
            _config = config;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<RegisterUserDto> Register(RegisterUserDto registeruserdto)
        {
            var user = _mapper.Map<User>(registeruserdto);
            var exist = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == registeruserdto.Email);
            if (exist != null)
            {
                return null;
            }
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            var registeredUserDto = _mapper.Map<RegisterUserDto>(user);
            return registeredUserDto;
        }


        public async Task<string> Login(LoginUserDto loginUserDto)
        {
            var log = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == loginUserDto.Email && u.Password == loginUserDto.Password);
            if (log == null)
            {
                return null;
            }
            else
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("fneiVNVIEQAnvieqrnvqiepoAQNRVOWMVOENVEN");
                var identity = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Role, "User"),
                    new Claim(ClaimTypes.Email, loginUserDto.Email),
                    new Claim(ClaimTypes.Name, log.Name)
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
        public async Task<IEnumerable<ResponseProductDto>> GetAllProducts()
        {
            return await _dbContext.Products
                .Select(p => _mapper.Map<ResponseProductDto>(p))
                .ToListAsync();
        }
        public async Task<UpdateUserDto> UpdateUser(string userEmail, UpdateUserDto user)
        {
            var userup = _dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            var currentuserId = userup.Id;
            var up_User = await _dbContext.Users.SingleOrDefaultAsync(u => u.Id == currentuserId);
            if (up_User == null)
            {
                return null;
            }
            _mapper.Map(user, up_User);
            await _dbContext.SaveChangesAsync();
            var updatedUserDto = _mapper.Map<UpdateUserDto>(up_User);
            return updatedUserDto;
        }
        public async Task<IEnumerable<ResponseProductDto>> SearchByBrand(string brandName)
        {
            var products = await _dbContext.Products
                .Where(p => p.Brand.ToLower().Replace(" ", "")
                .Equals(brandName.ToLower().Trim().Replace(" ", "")))
                .ToListAsync();
            if(products.Count == 0)
            {
                return null;
            }
            var mappedProducts = products.Select(p => _mapper.Map<ResponseProductDto>(p));
            return mappedProducts;
        }

        public async Task<List<CategoryDto>> GetCategories()
        {
            var categories = await _dbContext.Categories.Include(c => c.Products)
                .ToListAsync();

            var categoriesDto = _mapper.Map<List<CategoryDto>>(categories);

            return categoriesDto;
        }

        public async Task<IEnumerable<ResponseProductDto>> GetProductsByCategory(int categoryId)
        {
            var products = await _dbContext.Products
        .Where(p => p.CategoryId == categoryId)
        .ToListAsync();

            var productDtos = _mapper.Map<IEnumerable<ResponseProductDto>>(products);
            return productDtos;
        }

        public async Task<string> CheckOut(string userEmail)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            var currentUserId = user.Id;

            var cart = await _dbContext.Carts.Include(c => c.Items)
                                          .ThenInclude(i => i.Product)
                                          .FirstOrDefaultAsync(c => c.UserId == currentUserId);

            if (cart == null || cart.Items.Count == 0)
            {
                return null;
            }

            var order = new Order
            {
                UserId = currentUserId,
                OrderDate = DateTime.Now,
                TotalAmount = cart.Items.Sum(i => i.TotalPrice)
            };

            _dbContext.Order.Add(order);
            await _dbContext.SaveChangesAsync();

            var orderItems = cart.Items.Select(i => new OrderItem
            {
                OrderId = order.Id,
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                TotalPrice = i.TotalPrice
            }).ToList();

            _dbContext.OrderItem.AddRange(orderItems);

            _dbContext.Items.RemoveRange(cart.Items);
            cart.Items.Clear();

            await _dbContext.SaveChangesAsync();

            return "Order placed successfully.";
        }
        public async Task<IEnumerable<OrderItemDto>> GetOrdersByUserId(string userEmail)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            var currentUserId = user.Id;

            var orders = await _dbContext.Order
                .Where(o => o.UserId == currentUserId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            var orderItemDtos = orders.SelectMany(o => o.OrderItems, (o, oi) => new OrderItemDto
            {
                Id = oi.Id,
                OrderId = o.Id,
                ProductId = oi.ProductId,
                ProductBrand = oi.Product.Brand,
                ProductDescription = oi.Product.ProductDescription,
                ProductPrice = oi.Product.Price,
                ProductImgUrl = oi.Product.ImgUrl,
                Quantity = oi.Quantity,
                TotalPrice = oi.TotalPrice,
                OrderDate = o.OrderDate
            })
                    .ToList();

            return orderItemDtos;
        }

        public async Task<UpdateUserDto> GetUserDetails(string userEmail)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == userEmail);
            if (user == null)
            {
                return null;
            }
            var userDto = _mapper.Map<UpdateUserDto>(user);
            return userDto;
        }

        public void DeleteAccount(string userEmail)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Email == userEmail);
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }
    }
}
