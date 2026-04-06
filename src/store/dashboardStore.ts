import { dashboardService } from "@/services/dashboard.service";
import { CountData, DashboardData } from "@/types/dashboard";
import { create } from "zustand";

interface dashStoreInt {
  dashboard: DashboardData | null;
  count: CountData | null;
  loading: boolean;

  fetchDashCount: () => Promise<void>;
  fetchDash: () => Promise<void>;
}

const useDashStore = create<dashStoreInt>((set) => ({
  dashboard: null,
  count: null,
  loading: false,

  fetchDashCount: async () => {
    set({ loading: true });

    try {
      const response = await dashboardService.getCount();

      set({
        count: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  fetchDash: async () => {
    set({ loading: true });

    try {
      const response = await dashboardService.getAllStats();

      set({
        dashboard: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },
}));
export default useDashStore;
