using System;

namespace GTAVersions.Data.Entities
{
    public class RefreshToken
    {
        public string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
