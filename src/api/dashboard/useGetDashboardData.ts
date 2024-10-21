import { Equipment } from "@/types/Equipment";
import { AxiosResponse, Paginate, PaginateParams } from "@/types/Paginate";
import { Transaction } from "@/types/Transactions";
import { User } from "@/types/User";
import { ADMIN_API } from "@/utils/Api";
import { useEffect, useState } from "react";

interface DashboardDataProps {
  transactionsData: Paginate<Transaction[]>;
  equipmentsData: Paginate<Equipment[]>;
  usersData: Paginate<User[]>;
}

export function usegetDashboardData() {
  const [data, setData] = useState<DashboardDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [transactions, equipments, users] = await Promise.all([
          ADMIN_API.get<PaginateParams, AxiosResponse<Paginate<Transaction[]>>>(
            "/transactions",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
          ADMIN_API.get<PaginateParams, AxiosResponse<Paginate<Equipment[]>>>(
            "/equipments",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
          ADMIN_API.get<PaginateParams, AxiosResponse<Paginate<User[]>>>(
            "/users",
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          ),
        ]);

        setData({
          transactionsData: transactions.data,
          equipmentsData: equipments.data,
          usersData: users.data,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  return { loading, data } as const;
}
