namespace fizjobackend.Entities.BlogEntities
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Post Post { get; set; }
    }
}
