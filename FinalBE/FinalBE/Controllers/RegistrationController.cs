using FinalBE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace FinalBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        [HttpPost]
        [Route("Registration")]

        public Response Registration(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.Registration(registration, connection);

            return response;
        }
        [HttpPost]
        [Route("Login")]
        public Response Login(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.Login(registration, connection);

            return response;
        }
        [HttpPost]
        [Route("UserApproval")]
        public Response UserApproval(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.UserApproval(registration, connection);

            return response;
        }
        [HttpPost]
        [Route("StaffRegistration")]

        public Response StaffRegistration(Registration registration)
         {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.StaffRegistration(registration, connection);

            return response;
        }
        [HttpDelete]
        [Route("DeleteStaff")]

        public Response DeleteStaff(Staff staff)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.DeleteStaff(staff, connection);

            return response;
        }
        [HttpPost]
        [Route("RegistrationList")]

        public Response RegistrationList(Registration registration)
        {
            Response response = new Response();
            SqlConnection connection = new SqlConnection(_configuration.GetConnectionString("SNCon").ToString());
            Dal dal = new Dal();
            response = dal.RegistrationList(registration, connection);

            return response;
        }

    }
}
