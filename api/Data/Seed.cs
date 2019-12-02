using System.Collections.Generic;
using System.Text.Json;
using api.Models;
using Newtonsoft.Json;

namespace api.Data
{
  public class Seed
  {
    private readonly DataContext context;
    public Seed(DataContext context)
    {
      this.context = context;
    }

    public void SeedUsers()
    {
      var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
      // var users = JsonSerializer.Deserialize<List<User>>(userData);
      var users = JsonConvert.DeserializeObject<List<User>>(userData);

      foreach (var user in users)
      {
        CreatePasswordHash("password", out byte[] passwordHash, out byte[] passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
        user.Username = user.Username.ToLower();

        context.Users.Add(user);
      }

      context.SaveChanges();
    }


    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      using (var hmac = new System.Security.Cryptography.HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
      }

    }

  }
}