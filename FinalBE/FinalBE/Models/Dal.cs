using Microsoft.AspNetCore.Components.Forms;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
namespace FinalBE.Models
{
    public class Dal
    {
        public Response Registration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Registration(Name,Email,Password,PhoneNo,IsActive,IsApproved) Values('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.PhoneNo + "',1,0)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Registration successful";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Registration failed";
            }
            return response;
        }
        public Response Login(Registration registration, SqlConnection connection)
        { 
            Response response = new Response();
            Console.WriteLine("email " + registration.Email);
            Console.WriteLine("parola " + registration.Password);
            SqlDataAdapter da = new SqlDataAdapter("select * from Registration where Email= '" + registration.Email + "'and Password='" + registration.Password + "' and IsApproved=1", connection); ;


            DataTable dt = new DataTable();
            da.Fill(dt);
            Console.WriteLine("dt.Rows.Count: " + dt.Rows.Count);
            Console.WriteLine("registration.IsApproved: " + registration.IsApproved);
            if (dt.Rows.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Login Successful";
                Registration reg = new Registration();
                reg.id = Convert.ToInt32(dt.Rows[0]["Id"]);
                reg.Name = Convert.ToString(dt.Rows[0]["Name"]);
                reg.Email = Convert.ToString(dt.Rows[0]["Email"]);
                response.Registration = reg;
            }
            else
            {
                da = new SqlDataAdapter("select * from Registration where Email= '" + registration.Email + "'and Password='" + registration.Password + "' and IsApproved=0", connection);
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    response.StatusCode = 101;
                    response.StatusMessage = "Waiting for approval";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Login Failed";
                    response.Registration = null;
                }
            }
            return response;
        }
        public Response UserApproval(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Update registration set IsApproved = 1 where Id='" + registration.id + "' and IsActive=1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Approved";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Approval Failed";
            }
            return response;
        }
        public Response AddNews(News news, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into News(Title,Content,Email,IsActive,CreatedOn) values('" + news.Title + "','" + news.Content + "','" + news.Email + "',1,GETDATE())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "News Created";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "News Creation Failed";
            }

            return response;
        }
        public Response NewsList(SqlConnection connetion)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("select * from News where IsActive=1", connetion);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<News> list = new List<News>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    News news = new News();
                    news.id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    news.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    news.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    news.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    news.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    news.CreatedOn = Convert.ToString(dt.Rows[i]["IsActive"]);
                    list.Add(news);
                }
                if (list.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "News data found";
                    response.listNews = list;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "News data not found";
                    response.listNews = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "News data not found";
                response.listNews = null;
            }
            return response;
        }
        public Response AddArticle(Article article, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Article(Title,Content,Email,Image,IdActive,IsApproved) values('" + article.Title + "','" + article.Content + "','" + article.Email + "','" + article.Image + "',1,0)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Article Created";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article Creation Failed";
            }

            return response;
        }
        public Response ArticleList(Article article, SqlConnection connetion)
        {
            Response response = new Response();
            SqlDataAdapter da = null;
            if (article.type == "User")
            {
                da=new SqlDataAdapter("select * from Article where Email='" + article.Email + "' and IsActive=1", connetion);
            }
            if (article.type == "Page")
            {
                da=new SqlDataAdapter("select * from Article where IsActive=1", connetion);
            }
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Article> list = new List<Article>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Article art = new Article();
                    art.id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    art.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    art.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    art.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    art.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    art.Image = Convert.ToString(dt.Rows[i]["Image"]);
                    art.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    list.Add(art);
                }
                if (list.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Article data found";
                    response.listArticle = list;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Article data not found";
                    response.listArticle = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article data not found";
                response.listArticle = null;
            }
            return response;
        }
        public Response ArticleApproval(Article registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Update Article set IsApproved = 1 where Id='" + registration.id + "' and IsActive=1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Article Approved";

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article Approval Failed";
            }
            return response;
        }
        public Response StaffRegistration(Registration registration, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Registration(Name,Email,Password,UserType,IsActive,IsApproved) Values('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','Staff',1,1)", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff registration successful";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff registration failed";
            }
            return response;
        }
        public Response DeleteStaff(Staff staff, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Delete from Staff where Id='" + staff.id + "' and IsActive=1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Staff deleted successfully";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Staff deletion failed";
            }
            return response;
        }
        public Response AddEvent(Events events, SqlConnection connection)
        {
            Response response = new Response();
            SqlCommand cmd = new SqlCommand("Insert into Events(Title,Content,Email,IdActive,CreatedOn) values('" + events.Title + "','" + events.Content + "','" + events.Email + "',1,GetDate())", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Event Created";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Event Creation Failed";
            }

            return response;
        }
        public Response EventList(SqlConnection connetion)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("select * from Events where IsActive=1", connetion);

            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Events> list = new List<Events>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Events event_ = new Events();
                    event_.id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    event_.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    event_.Content = Convert.ToString(dt.Rows[i]["Content"]);
                    event_.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    event_.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    event_.CreatedOn = Convert.ToString(dt.Rows[i]["CreatedOn"]);

                    list.Add(event_);
                }
                if (list.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Events data found";
                    response.listEvents = list;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Events data not found";
                    response.listEvents = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Events data not found";
                response.listEvents = null;
            }
            return response;
        }
        public Response RegistrationList(Registration registration, SqlConnection connetion)
        {
            Response response = new Response();
            SqlDataAdapter da =new SqlDataAdapter("select * from Registration where UserType='" + registration.UserType + "' and IsActive=1", connetion);

            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Registration> list = new List<Registration>();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Registration reg = new Registration();
                    reg.id = Convert.ToInt32(dt.Rows[i]["Id"]);
                    reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    reg.Password = Convert.ToString(dt.Rows[i]["Password"]);
                    reg.PhoneNo = Convert.ToString(dt.Rows[i]["PhoneNo"]);
                    reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    reg.UserType = Convert.ToString(dt.Rows[i]["userType"]);
                    reg.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    list.Add(reg);
                }
                if (list.Count > 0)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Article data found";
                    response.listRegistration = list;
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Article data not found";
                    response.listRegistration = null;
                }

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Article data not found";
                response.listRegistration = null;
            }
            return response;
        }


    }
}
