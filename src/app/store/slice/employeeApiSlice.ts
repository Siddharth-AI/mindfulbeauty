import { apiSlice } from '../../store/slice/apiSlice';

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getEmployees: builder.query({
      query: () => '/employee/get-employee',
      providesTags: ['Employee'],
      // API से डेटा प्राप्त करने के बाद, हम इसे रोल के आधार पर फिल्टर कर सकते हैं
      transformResponse: (response: { success: boolean; staff: any[]; error?: string }) => {
        // अगर API से एरर आता है तो उसे हैंडल करें
        if (!response.success) {
          throw new Error(response.error || 'Failed to fetch employees');
        }
        
        return {
          success: response.success,
          staff: response.staff || [],
          // रोल के आधार पर डेटा को अलग करें
          salonEmployees: response.staff?.filter(emp => emp.role === 'employee') || [],
          freelancers: response.staff?.filter(emp => emp.role === 'freelancer') || []
        };
      },
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApiSlice;