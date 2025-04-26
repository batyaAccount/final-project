namespace Api_Bussiness.API.PostEntity
{
    public class FilePostEntity
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long Size { get; set; }
        public string S3Key { get; set; }
        public int InvoiceId { get; set; }
        public int ClientId { get; set; }
    }
}
