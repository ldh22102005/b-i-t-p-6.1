import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  // 1. Tạo state lưu text nhập vào và state lưu lỗi
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // 2. Hàm xử lý: Auto format và Validation khi nhập (Real-time)
  const handlePhoneChange = (text) => {
    // Xóa tất cả các ký tự không phải là số
    let cleaned = text.replace(/\D/g, '');

    // Giới hạn độ dài tối đa là 10 số (chuẩn số điện thoại VN)
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    // Tự động format thêm dấu cách: 0XX XXX XXXX
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }

    // Update ngược lại vào TextInput
    setPhone(formatted);

    // Validation khi người dùng nhập
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
      setError('Số điện thoại phải bắt đầu bằng số 0');
    } else if (cleaned.length > 0 && cleaned.length < 10) {
      setError('Số điện thoại chưa đủ 10 số');
    } else {
      setError(''); // Xóa lỗi nếu đã nhập đúng định dạng
    }
  };

  // 3. Hàm xử lý: Validation khi click nút Tiếp tục
  const handleContinue = () => {
    // Bỏ hết dấu cách để kiểm tra số gốc
    const rawPhone = phone.replace(/\s/g, ''); 

    if (!rawPhone) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại');
      return;
    }

    if (rawPhone.length !== 10 || !rawPhone.startsWith('0')) {
      Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!');
      return;
    }

    // Nếu hợp lệ
    Alert.alert('Thành công', `Số điện thoại hợp lệ: ${rawPhone}`);
  };

  // Xác định trạng thái nút (Sáng lên nếu nhập đủ 10 số, không có lỗi)
  const isButtonActive = phone.replace(/\s/g, '').length === 10 && error === '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </View>
      
      <View style={styles.divider} />

      <View style={styles.body}>
    
        <Text style={styles.label}>Nhập số điện thoại</Text>
        
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        <TextInput 
          style={[styles.input, error ? styles.inputError : null]} // Đổi màu viền nếu có lỗi
placeholder="Nhập số điện thoại của bạn"
          placeholderTextColor="#bdbdbd"
keyboardType="phone-pad"  
          value={phone} 
          onChangeText={handlePhoneChange} 
          maxLength={12} // 10 số + 2 dấu cách
        />

        {/* Hiển thị thông báo cảnh báo màu đỏ phía dưới TextInput nếu giá trị có lỗi */}
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        {/* Nút tiếp tục */}
        <TouchableOpacity 
          style={[styles.button, isButtonActive ? styles.buttonActive : null]} 
          onPress={handleContinue}
        >
          <Text style={[styles.buttonText, isButtonActive ? styles.buttonTextActive : null]}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Phần Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, 
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0', 
    width: '100%',
  },
  body: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666', 
    marginBottom: 30,
    lineHeight: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    marginBottom: 10, 
  },
  inputError: {
    borderBottomColor: 'red', 
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f5f5f5', 
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#000', 
  },
  buttonText: {
    color: '#bdbdbd', 
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#fff', 
  },
});
