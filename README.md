# InternetBanking-FrontEnd

FrontEnd Internet Banking - Đồ án cuối kì - PTUDWNC 2020 - HCMUS

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

#### 1.4 Chuyển khoản

- [x] Chuyển khoản

  - [x] Luồng đi giữa các màn hình
  - [x] Điền thông tin **người nhận** và **ngân hàng**
  - [x] Nhập OTP
  - [x] Gợi ý lưu vào danh sách người nhận

- [ ] Chuyển khoản liên ngân hàng

#### 1.5 Quản lý nợ

- [ ] Tạo nhắc nợ

  - [ ] Điền thông tin người nợ
  - [ ] Nhập **số tiền** và **nội dung nợ**

- [ ] Xem danh sách nợ

  - [ ] Nợ tạo
  - [ ] Nợ do người khác nhắc

- [ ] Huỷ nợ

  - [ ] Chọn nhắc nợ (id) và nội dung xoá

- [ ] Thanh toán nợ

  - [ ] Chọn nợ (id)
  - [ ] Nhập OTP
  - [ ] Báo thành công

#### 1.6 Quản lý giao dịch

- [x] Xem lịch sử giao dịch

  - [x] Nhận tiền
  - [x] Chuyển tiền
  - [x] Thanh toán nợ (nợ tạo + nợ được nhắc)
  - [x] Xem theo thời gian
  - [ ] Filter (để sau)

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
  - [ ] Hoặc theo tên đăng nhập
  - [x] Luồng màn hình
  - [x] Luồng dữ liệu

#### 2.3 Xem lịch sử giao dịch một khách hàng

- [ ] Như ở **1.6**

## 3. Quản trị viên - Administrator

- [ ] Quản lý nhân viên

  - [ ] Create, Read, Delete

- [ ] Xem giao dịch trong tháng với ngân hàng khác
  - [ ] Xem trong khoảng thời gian
  - [ ] Xem theo từng ngân hàng/tất cả ngân hàng
  - [ ] Thống kê số tiền giao dịch (nhận hoặc chuyển)
