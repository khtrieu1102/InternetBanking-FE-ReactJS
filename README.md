# InternetBanking-FrontEnd

FrontEnd Internet Banking - Đồ án cuối kì - PTUDWNC 2020 - HCMUS
Sinh viên: NGUYỄN NGỌC KHẮC TRIỆU 1612738

# Công nghệ sử dụng
- [x] **ReactJS** kết hợp React-Bootstrap + Ant Design
- [x] **React-Redux, Redux Thunk**

# Các kĩ thuật/thuật toán thêm
- [x] Authentication (nhiều role), **Access Token JWT**
- [x] Refresh Token
- [x] Mã hoá bất đối xứng RSA/PGP
- [x] Realtime (Các kĩ thuật Short Polling, Long Polling, WebSockets). Trong đồ án này sử dụng **Long Polling**

# Theo dõi công việc

## 0. Phân quyền

- [x] Tạo navbar cho mỗi quyền
- [x] Tạo route cho mỗi quyền

## 1. Customer

#### 1.1. Đăng nhập

- [x] Đăng nhập
- [x] Sử dụng captcha

#### 1.2 Liệt kê tài khoản

- [x] Dashboard
  - [x] Hiển thị số dư tài khoản

#### 1.3 Thiết lập danh sách người nhận

- [x] Thông tin danh sách người nhận

  - [x] Show thông tin từ API
  - [x] CRUD
  - [x] Sử dụng tên đăng ký làm savedName khi không nhập

- [x] Xử lý liên ngân hàng
  - [x] 3TBank
  - [x] BAOSON Bank

#### 1.4 Chuyển khoản

- [x] Chuyển khoản

  - [x] Luồng đi giữa các màn hình
  - [x] Điền thông tin **người nhận** và **ngân hàng**
  - [x] Nhập OTP
  - [x] Gợi ý lưu vào danh sách người nhận

- [x] Chuyển khoản liên ngân hàng
  - [x] 3TBank
  - [x] BAOSON Bank

#### 1.5 Quản lý nợ

- [x] Tạo nhắc nợ

  - [x] Điền thông tin người nợ
  - [x] Nhập **số tiền** và **nội dung nợ**

- [x] Xem danh sách nợ

  - [x] Nợ tạo
  - [x] Nợ do người khác nhắc

- [x] Huỷ nợ

  - [x] Chọn nhắc nợ (id) và nội dung xoá
  - [x] Xoá được nhắc nợ
  - [x] Notify cho người nhắc hoặc người được nhắc

- [x] Thanh toán nợ

  - [x] Chọn nợ (id)
  - [x] Nhập OTP
  - [x] Báo thành công
  - [x] Notification cho người nhắc nợ

#### 1.6 Quản lý giao dịch

- [x] Xem lịch sử giao dịch

  - [x] Nhận tiền
  - [x] Chuyển tiền
  - [x] Thanh toán nợ (nợ tạo + nợ được nhắc)
  - [x] Xem theo thời gian
  - [x] Xem chi tiết giao dịch
  - [x] Filter

#### 1.7 Đổi mật khẩu

- [x] Chỉnh sửa thông tin

  - [x] Thông tin cơ bản (name, phone, email)
  - [x] Đổi mật khẩu

#### 1.8 Quên mật khẩu

- [x] Quên mật khẩu.
  - [x] Luồng đi giữa các màn hình
  - [x] Luồng dữ liệu

## 2. Employee

#### 2.1 Tạo tài khoản

- [x] Tạo tài khoản cho customer
  - [x] Luồng màn hình
  - [x] Luồng dữ liệu

#### 2.2 Nạp tiền vào tài khoản

- [x] Nạp tiền cho customer
  - [x] Theo số tài khoản
  - [x] Hoặc theo tên đăng nhập
  - [x] Luồng màn hình
  - [x] Luồng dữ liệu

#### 2.3 Xem lịch sử giao dịch một khách hàng

- [x] Như ở **1.6**

## 3. Quản trị viên - Administrator

- [x] Quản lý nhân viên

  - [x] Xem danh sách nhân viên
  - [x] Xem thông tin một nhân viên
  - [x] Vô hiệu hoá tài khoản nhân viên
  - [x] Tạo tài khoản nhân viên

- [x] Xem giao dịch trong tháng với ngân hàng khác
  - [ ] Xem trong khoảng thời gian
  - [ ] Xem theo từng ngân hàng/tất cả ngân hàng
  - [x] Thống kê số tiền giao dịch (nhận hoặc chuyển)

## 4. Phát sinh theo đề bài

- [x] Realtime Notification

## 5. Yêu cầu khác

- [x] Có 8 tài khoản
- [x] API nội bộ đều phải cài đặt **access-token** và **refresh-token**
- [x] Kết nối 2 ngân hàng khác
  - [x] PGP
  - [x] RSA
- [x] Up lên Github
