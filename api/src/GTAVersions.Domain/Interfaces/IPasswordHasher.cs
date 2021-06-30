namespace GTAVersions.Domain.Interfaces
{
    public interface IPasswordHasher
    {
        string Hash(string password);
        public bool Check(string hash, string password);
    }
}
