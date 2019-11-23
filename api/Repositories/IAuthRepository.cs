using System.Threading.Tasks;
using api.Models;

namespace api.Repositories
{
  public interface IAuthRepository
  {
    Task<User> Register(User user, string password);
    Task<User> Login(string username, string password);
    Task<bool> UserExists(string username);
  }
}