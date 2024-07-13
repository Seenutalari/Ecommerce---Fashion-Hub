using System.ComponentModel.DataAnnotations;

namespace EcommereceApp.Entites.DTOs.AdminDto
{
    public class RegisterAdminDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password must match.")]
        public string ConfirmPassword { get; set; }
    }
}
