using System.ComponentModel.DataAnnotations;

namespace EcommereceApp.Entites.DTOs.AdminDto
{
    public class LoginAdminDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
