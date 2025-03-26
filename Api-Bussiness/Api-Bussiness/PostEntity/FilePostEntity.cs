namespace Api_Bussiness.API.PostEntity
{
    public class FilePostEntity
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long Size { get; set; }
        public string S3Key { get; set; }
        public int ReceiptId { get; set; }
        //public int FolderId { get; set; }
        public int OwnerId { get; set; }
    }
}
