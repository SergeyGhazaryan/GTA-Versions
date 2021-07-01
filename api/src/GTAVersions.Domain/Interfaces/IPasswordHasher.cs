namespace GTAVersions.Domain.Interfaces
{
    public interface IPasswordHasher
    {
        string PasswordHash(string password);
        public bool Check(string passwordHash, string password);
    }
}
