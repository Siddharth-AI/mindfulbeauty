import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// स्टेट का इंटरफेस डिफाइन करें
interface EmployeeState {
  activeTab: 'salon' | 'freelancer';
  selectedEmployee: any | null;
  isLoading: boolean;
  error: string | null;
}

// इनिशियल स्टेट
const initialState: EmployeeState = {
  activeTab: 'salon',
  selectedEmployee: null,
  isLoading: false,
  error: null,
};

// स्लाइस बनाएं
export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // टैब बदलने के लिए एक्शन
    setActiveTab: (state, action: PayloadAction<'salon' | 'freelancer'>) => {
      state.activeTab = action.payload;
    },
    // सिलेक्टेड एम्प्लॉयी सेट करने के लिए एक्शन
    setSelectedEmployee: (state, action: PayloadAction<any | null>) => {
      state.selectedEmployee = action.payload;
    },
    // लोडिंग स्टेट सेट करने के लिए एक्शन
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // एरर स्टेट सेट करने के लिए एक्शन
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// एक्शन एक्सपोर्ट करें
export const { setActiveTab, setSelectedEmployee, setLoading, setError } = employeeSlice.actions;

// सिलेक्टर्स एक्सपोर्ट करें
export const selectActiveTab = (state: RootState) => state.employee.activeTab;
export const selectSelectedEmployee = (state: RootState) => state.employee.selectedEmployee;
export const selectIsLoading = (state: RootState) => state.employee.isLoading;
export const selectError = (state: RootState) => state.employee.error;

// रिड्यूसर एक्सपोर्ट करें
export default employeeSlice.reducer;