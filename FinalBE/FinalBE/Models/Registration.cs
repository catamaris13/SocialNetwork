namespace FinalBE.Models
{
    public class Registration
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNo { get; set; }
        public string UserType {  get; set; }
        public int IsActive { get; set; }
        public  int IsApproved { get; set; }
    }
}
