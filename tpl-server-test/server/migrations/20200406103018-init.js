'use strict'
module.exports = {
  up: async function(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER DATABASE company SET timezone TO 'Asia/Ho_Chi_Minh';
      
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE users(
        u_id uuid PRIMARY KEY default uuid_generate_v4(),
        u_fullname text NOT NULL,
        u_phone text NOT NULL,
        u_email text NOT NULL UNIQUE,
        u_pw text NOT NULL
    );



      create table userRefreshTokenExt(
        ID bigserial primary key,
        refreshToken text,
        rdt timestamp default now(),
        created_at timestamp default now(),
        updated_at timestamp
      );

      create table categories(
        CatID bigserial primary key,
        CatName text,
        created_at timestamp default now(),
        updated_at timestamp
      );

      insert into categories (CatName) values
        ('Sách'),
        ('Điện thoại'),
        ('Máy chụp hình'),
        ('Quần áo - Giày dép'),
        ('Máy tính'),
        ('Đồ trang sức'),
        ('Khác');

        create table products(
          ProID bigserial primary key,
          ProName text,
          TinyDes text,
          FullDes text,
          Price int,
          CatID int,
          Quantity int,
          created_at timestamp default now(),
          updated_at timestamp
        );

      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Freshwater Cultured Pearl', 'Freshwater Cultured Pearl, Citrine, Peridot & Amethyst Bracelet, 7.5\"', '<UL>\r\n    <LI>Metal stamp: 14k </LI>\r\n    <LI>Metal: yellow-ld</LI>\r\n    <LI>Material Type: amethyst, citrine, ld, pearl, peridot</LI>\r\n    <LI>Gem Type: citrine, peridot, amethyst</LI>\r\n    <LI>Length: 7.5 inches</LI>\r\n    <LI>Clasp Type: filigree-box</LI>\r\n    <LI>Total metal weight: 0.6 Grams</LI>\r\n</UL>\r\n<STRONG>Pearl Information</STRONG><BR>\r\n<UL>\r\n    <LI>Pearl type: freshwater-cultured</LI>\r\n</UL>\r\n<STRONG>Packaging Information</STRONG><BR>\r\n<UL>\r\n    <LI>Package: Regal Blue Sueded-Cloth Pouch</LI>\r\n</UL>', 1500000, 6, 83);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Pink Sapphire Sterling Silver', '14 1/2 Carat Created Pink Sapphire Sterling Silver Bracelet w/ Diamond Accents', '<P><STRONG>Jewelry Information</STRONG></P>\r\n<UL>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n</UL>\r\n', 300000, 6, 64);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Torrini KC241', 'Nhẫn kim cương - vẻ đẹp kiêu sa', '<P>Không chỉ có kiểu dáng truyền thống chỉ có một hạt kim cương ở giữa, các nhà thiết kế đã tạo những những chiếc nhẫn vô cùng độc đáo và tinh tế. Tuy nhiên, giá của đồ trang sức này thì chỉ có dân chơi mới có thể kham được.</P>\r\n<UL>\r\n    <LI>Kiểu sản phẩm: Nhẫn nữ</LI>\r\n    <LI>Loại đá: To paz</LI>\r\n    <LI>Chất liệu: kim cương, nguyên liệu và công nghệ Italy...</LI>\r\n    <LI>Đơn giá: 2,110,250 VND / Chiếc</LI>\r\n</UL>\r\n', 1600000000, 6, 86);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Torrini KC242', 'tinh xảo và sang trọng', '<P>Để sở hữu một chiếc nhẫn kim cương lấp lánh trên tay, bạn phải là người chịu chi và sành điệu.<BR>\r\nVới sự kết hợp khéo léo và độc đáo giữa kim cương và Saphia, Ruby... những chiếc nhẫn càng trở nên giá trị.</P>\r\n<UL>\r\n    <LI>Kiểu sản phẩm: Nhẫn nam</LI>\r\n    <LI>Loại đá: To paz</LI>\r\n    <LI>Chất liệu: Vàng tây 24K, nguyên liệu và công nghệ Italy...</LI>\r\n</UL>\r\n', 42000000, 6, 63);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Nokia 7610', 'Độ phân giải cao, màn hình màu, chụp ảnh xuất sắc.', '<UL>\r\n    <LI>Máy ảnh có độ phân giải 1 megapixel</LI>\r\n    <LI>Màn hình 65.536 màu, rộng 2,1 inch, 176 X 208 pixel với đồ họa sắc nét, độ phân giải cao</LI>\r\n    <LI>Quay phim video lên đến 10 phút với hình ảnh sắc nét hơn</LI>\r\n    <LI>Kinh nghiệm đa phương tiện được tăng cường</LI>\r\n    <LI>Streaming video &amp; âm thanh với RealOne Player (hỗ trợ các dạng thức MP3/AAC).</LI>\r\n    <LI>Nâng cấp cho những đoạn phim cá nhân của bạn bằng các tính năng chỉnh sửa tự động thông minh</LI>\r\n    <LI>In ảnh chất lượng cao từ nhà, văn phòng, kios và qua mạng</LI>\r\n    <LI>Dễ dàng kết nối vớI máy PC để lưu trữ và chia sẻ (bằng cáp USB, PopPort, công nghệ Bluetooth)</LI>\r\n    <LI>48 nhạc chuông đa âm sắc, True tones. Mạng GSM 900 / GSM 1800 / GSM 1900</LI>\r\n    <LI>Kích thước 109 x 53 x 19 mm, 93 cc</LI>\r\n    <LI>Trọng lượng 118 g</LI>\r\n    <LI>Hiển thị: Loại TFT, 65.536 màu</LI>\r\n    <LI>Kích cở: 176 x 208 pixels </LI>\r\n</UL>\r\n', 2900000, 2, 0);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Áo thun nữ', 'Màu sắc tươi tắn, kiểu dáng trẻ trung', '<UL>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\r\n</UL>\r\n', 180000, 4, 62);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Simen AP75', 'Thiết kế tinh xảo, hiện đại', '<UL>\r\n    <LI>Hình ảnh hoàn hảo, rõ nét ở mọi góc màn hình</LI>\r\n    <LI>Giảm thiểu sự phản chiếu ánh sáng</LI>\r\n    <LI>Menu hiển thị tiếng Việt</LI>\r\n    <LI>Hệ thống hình ảnh thông minh</LI>\r\n    <LI>Âm thanh Hifi Stereo mạnh mẽ</LI>\r\n    <LI>Hệ thống âm lượng thông minh</LI>\r\n    <LI>Bộ nhớ 100 chương trình</LI>\r\n    <LI>Chọn kênh ưa thích</LI>\r\n    <LI>Các kiểu sắp đặt sẵn hình ảnh / âm thanh</LI>\r\n    <LI>Kích thước (rộng x cao x dày): 497 x 458 x 487mm</LI>\r\n    <LI>Trọng lượng: 25kg</LI>\r\n    <LI>Màu: vàng, xanh, bạc </LI>\r\n</UL>\r\n', 2800000, 2, 15);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Áo bé trai', 'Hóm hỉnh dễ thương', '<UL>\r\n    <LI>Quần áo bé trai</LI>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\r\n</UL>\r\n', 270000, 4, 74);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Bông tai nạm hạt rubby', 'Trẻ trung và quý phái', '<UL>\r\n    <LI>Tên sản phẩm: Bông tai nạm hạt rubby</LI>\r\n    <LI>Đóng nhãn hiệu: Torrini</LI>\r\n    <LI>Nguồn gốc, xuất xứ: Italy</LI>\r\n    <LI>Hình thức thanh toán: L/C T/T M/T CASH</LI>\r\n    <LI>Thời gian giao hàng: trong vòng 3 ngày kể từ ngày mua</LI>\r\n    <LI>Chất lượng/chứng chỉ: od</LI>\r\n</UL>\r\n', 2400000, 6, 43);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Đầm dạ hội ánh kim', 'Đủ màu sắc - kiểu dáng', '<UL>\r\n    <LI>Màu sắc: Khuynh hướng ánh kim có thể thể hiện trên vàng, bạc, đỏ tía, xanh biển, vàng tím, trắng và đen.</LI>\r\n    <LI>Một số biến tấu mang tính vui nhộn là vàng chanh, màu hoa vân anh và ngọc lam; trong đó hoàng kim và nhũ bạc khá phổ biến.</LI>\r\n    <LI>Phong cách: Diềm đăng ten, rủ xuống theo chiều thẳng đứng, nhiều lớp, cổ chẻ sâu, eo chít cao tới ngực... được biến tấu tùy theo mỗi nhà thiết kế.</LI>\r\n</UL>\r\n', 2800000, 4, 80);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Dây chuyền ánh bạc', 'Kiểu dáng mới lạ', '<UL>\r\n    <LI>Chất liệu chính: Bạc</LI>\r\n    <LI>Màu sắc: Bạc</LI>\r\n    <LI>Chất lượng: Mới</LI>\r\n    <LI>Phí vận chuyển: Liên hệ</LI>\r\n    <LI>Giá bán có thể thay đổi tùy theo trọng lượng và giá vàng của từng thời điểm.</LI>\r\n</UL>\r\n', 250000, 6, 88);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Đồ bộ bé gái', 'Đủ màu sắc - kiểu dáng', '<UL>\r\n    <LI>Màu sắc: đỏ tía, xanh biển, vàng tím, trắng và đen.</LI>\r\n    <LI>Xuất xứ: Tp. Hồ Chí Minh</LI>\r\n    <LI>Chất liệu: cotton</LI>\r\n    <LI>Loại hàng: hàng trong nước</LI>\r\n</UL>\r\n', 120000, 4, 61);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Đầm dạ hội Xinh Xinh', 'Đơn giản nhưng quý phái', '<P>Những đường cong tuyệt đẹp sẽ càng được phô bày khi diện các thiết kế này.</P>\r\n<UL>\r\n    <LI>Nét cắt táo bạo ở ngực giúp bạn gái thêm phần quyến rũ, ngay cả khi không có trang&nbsp; sức nào trên người.</LI>\r\n    <LI>Đầm hai dây thật điệu đà với nơ xinh trước ngực nhưng trông bạn vẫn toát lên vẻ tinh nghịch và bụi bặm nhờ thiết kế đầm bí độc đáo cùng sắc màu sẫm.</LI>\r\n    <LI>Hãng sản xuất: NEM</LI>\r\n    <LI>Kích cỡ : Tất cả các kích cỡ</LI>\r\n    <LI>Kiểu dáng : Quây/Ống</LI>\r\n    <LI>Chất liệu : Satin</LI>\r\n    <LI>Màu : đen, đỏ</LI>\r\n    <LI>Xuất xứ : Việt Nam</LI>\r\n</UL>\r\n', 2600000, 4, 92);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Đầm dạ hội NEM', 'Táo bạo và quyến rũ', '<P>Những đường cong tuyệt đẹp sẽ càng được phô bày khi diện các thiết kế này.</P>\r\n<UL>\r\n    <LI>Nét cắt táo bạo ở ngực giúp bạn gái thêm phần quyến rũ, ngay cả khi không có trang&nbsp; sức nào trên người.</LI>\r\n    <LI>Đầm hai dây thật điệu đà với nơ xinh trước ngực nhưng trông bạn vẫn toát lên vẻ tinh nghịch và bụi bặm nhờ thiết kế đầm bí độc đáo cùng sắc màu sẫm.</LI>\r\n    <LI>Hãng sản xuất: NEM</LI>\r\n    <LI>Kích cỡ : Tất cả các kích cỡ</LI>\r\n    <LI>Kiểu dáng : Quây/Ống</LI>\r\n    <LI>Chất liệu : Satin</LI>\r\n    <LI>Màu : đen, đỏ</LI>\r\n    <LI>Xuất xứ : Việt Nam</LI>\r\n</UL>\r\n', 1200000, 4, 0);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Dây chuyền đá quý', 'Kết hợp vàng trắng và đá quý', '<UL>\r\n    <LI>Kiểu sản phẩm: Dây chuyền</LI>\r\n    <LI>Chất liệu: Vàng trắng 14K và đá quý, nguyên liệu và công nghệ Italy...</LI>\r\n    <LI>Trọng lượng chất liệu: 1.1 Chỉ </LI>\r\n</UL>\r\n', 1925000, 6, 22);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Nokia N72', 'Sành điệu cùng N72', '<UL>\r\n    <LI>Camera mega pixel : 2 mega pixel</LI>\r\n    <LI>Bộ nhớ trong : 16 - 31 mb</LI>\r\n    <LI>Chức năng : quay phim, ghi âm, nghe đài FM</LI>\r\n    <LI>Hỗ trợ: Bluetooth, thẻ nhớ nài, nhạc MP3 &lt;br/&gt;</LI>\r\n    <LI>Trọng lượng (g) : 124g</LI>\r\n    <LI>Kích thước (mm) : 109 x 53 x 21.8 mm</LI>\r\n    <LI>Ngôn ngữ : Có tiếng việt</LI>\r\n    <LI>Hệ điều hành: Symbian OS 8.1</LI>\r\n</UL>\r\n', 3200000, 2, 81);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Mặt dây chuyền Ruby', 'Toả sáng cùng Ruby', '<UL>\r\n    <LI>Kiểu sản phẩm:&nbsp; Mặt dây</LI>\r\n    <LI>Chất liệu: Vàng trắng 14K, nguyên liệu và công nghệ Italy...</LI>\r\n    <LI>Trọng lượng chất liệu: 0.32 Chỉ</LI>\r\n</UL>\r\n', 1820000, 6, 33);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('1/2 Carat Pink Sapphire Silver', 'Created Pink Sapphire', '<UL>\r\n    <LI>Brand Name: Ice.com</LI>\r\n    <LI>Material Type: sterling-silver, created-sapphire, diamond</LI>\r\n    <LI>Gem Type: created-sapphire, Diamond</LI>\r\n    <LI>Minimum total gem weight: 14.47 carats</LI>\r\n    <LI>Total metal weight: 15 Grams</LI>\r\n    <LI>Number of stones: 28</LI>\r\n    <LI>Created-sapphire Information</LI>\r\n    <LI>Minimum color: Not Available</LI>\r\n</UL>\r\n', 3400000, 6, 10);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Netaya', 'Dây chuyền vàng trắng', '<UL>\r\n    <LI>Kiểu sản phẩm:&nbsp; Dây chuyền</LI>\r\n    <LI>Chất liệu: Vàng tây 18K, nguyên liệu và công nghệ Italy...</LI>\r\n    <LI>Trọng lượng chất liệu: 1 Chỉ</LI>\r\n</UL>\r\n', 1820000, 6, 17);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Giày nam GN16', 'Êm - đẹp - bề', '<UL>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\r\n    <LI>Giá: 300 000 VNĐ</LI>\r\n</UL>\r\n', 540000, 4, 0);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('G3.370A', 'Đen bóng, sang trọng', '<UL>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\r\n</UL>\r\n', 300000, 4, 74);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Giày nữ GN1', 'Kiểu dáng thanh thoát', '<UL>\r\n    <LI>Loại hàng: Hàng trong nước</LI>\r\n    <LI>Xuất xứ: Tp Hồ Chí Minh</LI>\r\n</UL>\r\n', 290000, 4, 30);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('NV002', 'Kiểu dáng độc đáo', '<P><STRONG>Thông tin sản phẩm</STRONG></P>\r\n<UL>\r\n    <LI>Mã sản phẩm: NV002</LI>\r\n    <LI>Trọng lượng: 2 chỉ</LI>\r\n    <LI>Vật liệu chính: Vàng 24K</LI>\r\n</UL>\r\n', 3600000, 6, 5);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('NV009', 'Sáng chói - mới lạ', '<P><STRONG>Thông tin sản phẩm</STRONG></P>\r\n<UL>\r\n    <LI>Mã sản phẩm: NV005</LI>\r\n    <LI>Trọng lượng: 1 cây</LI>\r\n    <LI>Vật liệu chính: Vàng 24K</LI>\r\n</UL>\r\n', 14900000, 6, 22);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('CK010', 'Độc đáo, sang trọng', '<UL>\r\n    <LI>Kiểu dáng nam tính và độc đáo, những thiết kế dưới đây đáp ứng được mọi yêu cần khó tính nhất của người sở hữu.</LI>\r\n    <LI>Những hạt kim cương sẽ giúp người đeo nó tăng thêm phần sành điệu</LI>\r\n    <LI>Không chỉ có kiểu dáng truyền thống chỉ có một hạt kim cương ở giữa, các nhà thiết kế đã tạo những những chiếc nhẫn vô cùng độc đáo và tinh tế.</LI>\r\n    <LI>Tuy nhiên, giá của đồ trang sức này thì chỉ có dân chơi mới có thể kham được</LI>\r\n</UL>\r\n', 2147483647, 6, 52);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('CK009', 'Nữ tính - đầy quí phái', '<UL>\r\n    <LI>Để sở hữu một chiếc nhẫn kim cương lấp lánh trên tay, bạn phải là người chịu chi và sành điệu.</LI>\r\n    <LI>Với sự kết hợp khéo léo và độc đáo giữa kim cương và Saphia, Ruby... những chiếc nhẫn càng trở nên giá trị</LI>\r\n    <LI>Nhà sản xuất: Torrini</LI>\r\n</UL>\r\n<P>Cái này rất phù hợp cho bạn khi tặng nàng</P>\r\n', 1850000000, 6, 11);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('CK007', 'Sự kết hợp khéo léo, độc đáo', '<UL>\r\n    <LI>Để sở hữu một chiếc nhẫn kim cương lấp lánh trên tay, bạn phải là người chịu chi và sành điệu.</LI>\r\n    <LI>Với sự kết hợp khéo léo và độc đáo giữa kim cương và Saphia, Ruby... những chiếc nhẫn càng trở nên giá trị</LI>\r\n    <LI>Nhà sản xuất: Torrini</LI>\r\n</UL>\r\n<P>Cái này rất phù hợp cho bạn khi tặng nàng</P>\r\n', 2147483647, 6, 28);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('CK005', 'Tinh xảo - sang trọng', '<UL>\r\n    <LI>Kim cương luôn là đồ trang sức thể hiện đẳng cấp của người sử dụng.</LI>\r\n    <LI>Không phải nói nhiều về những kiểu nhẫn dưới đây, chỉ có thể gói gọn trong cụm từ: tinh xảo và sang trọng</LI>\r\n    <LI>Thông tin nhà sản xuất: Torrini</LI>\r\n    <LI>Thông tin chi tiết: Cái này rất phù hợp cho bạn khi tặng nàng</LI>\r\n</UL>\r\n', 1800000000, 6, 29);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('NV01TT', 'Tinh tế đến không ngờ', '<UL>\r\n    <LI>Tinh xảo và sang trọng</LI>\r\n    <LI>Thông tin nhà sản xuất: Torrini</LI>\r\n    <LI>Không chỉ có kiểu dáng truyền thống chỉ có một hạt kim cương ở giữa, các nhà thiết kế đã tạo những những chiếc nhẫn vô cùng độc đáo và tinh tế.</LI>\r\n    <LI>Tuy nhiên, giá của đồ trang sức này thì chỉ có dân chơi mới có thể kham được</LI>\r\n</UL>\r\n', 500000000, 6, 49);
      INSERT INTO products(ProName, TinyDes, FullDes, Price, CatID, Quantity) VALUES ('Motorola W377', 'Nữ tính - trẻ trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 2400000, 2, 0);

      create table orderdetails(
        ID bigserial primary key,
        OrderID bigint,
        ProID int,
        Quantity int,
        Price int,
        Amount int,
        created_at timestamp default now(),
        updated_at timestamp
      );

      
    `, {raw: true}) 
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      
      

      
    `, {raw: true}) 
  }
}