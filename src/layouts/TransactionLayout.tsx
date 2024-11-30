import Input from "../components/common/Input";
import TransactionTable from "../components/common/tables/TransactionTable";
import LoadingCircle from "../components/common/LoadingCircle";
import useDebounce from "@/hooks/useDebounce";
import useGetAllTransactions, {
  FilterType,
} from "@/api/transactions/useGetAllTransactions";
import { ChangeEvent, useEffect, useState } from "react";
import { Transaction } from "@/types/Transactions";
import { PaginateParams } from "@/types/Paginate.ts";

export default function TransactionLayout() {
  const [filterState, setFilterState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });
  const { loading, data } = useGetAllTransactions(filterState);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const debounceSearch = useDebounce(search);

  useEffect(() => {
    if (!data) return;

    // Search filtering
    const searchFiltered = debounceSearch
      ? data.content.filter(
          (transaction) =>
            transaction?.equipment?.name
              .toLowerCase()
              .includes(debounceSearch.toLowerCase()) ||
            transaction?.user?.fullName
              .toLowerCase()
              .includes(debounceSearch.toLowerCase())
        )
      : data.content;

    // Apply selected filter
    const finalFiltered = handleFilter(filter, searchFiltered);
    setFilteredTransactions(finalFiltered);
  }, [data, debounceSearch, filter]);

  function handleFilter(
    filter: FilterType,
    transactions: Transaction[]
  ): Transaction[] {
    switch (filter) {
      case "pending":
        return transactions.filter(
          (transaction) =>
            transaction.returnedAt === null &&
            !transaction.approved &&
            transaction.conditionImage !== null
        );
      case "approved":
        return transactions.filter(
          (transaction) =>
            transaction.approved && transaction.returnedAt !== null
        );
      case "returned":
        return transactions.filter(
          (transaction) => transaction.returnedAt !== null
        );
      case "borrowed":
        return transactions.filter(
          (transaction) => transaction.returnedAt === null
        );
      case "all":
      default:
        return transactions;
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function deleteTransaction(transaction: Transaction) {
    setFilteredTransactions((prevTransactions) =>
      prevTransactions
        ? prevTransactions.filter((_t) => _t.id !== transaction.id)
        : []
    );
  }

  function updateTransaction(updatedTransaction: Transaction) {
    setFilteredTransactions((prev) =>
      prev
        ? prev.map((eq) =>
            eq.id === updatedTransaction.id ? updatedTransaction : eq
          )
        : []
    );
  }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center py-3">
            <h1 className="text-sm md:text-2xl sm:text-md font-semibold">
              Transactions
            </h1>
          </div>
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." onChange={handleSearch} />
            <div className={"flex gap-5 items-center"}>
              <select
                defaultValue={filterState.pageNo}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterState({
                    ...filterState,
                    pageSize: Number(e.target.value),
                  })
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                {Array.from(Array(data?.totalPages).keys()).map(
                  (pageNo, key) => (
                    <option
                      key={key}
                      selected={pageNo == filterState.pageNo}
                      value={pageNo}
                    >
                      {pageNo + 1}
                    </option>
                  )
                )}
              </select>
              <select
                defaultValue={filterState.pageSize}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterState({
                    ...filterState,
                    pageSize: Number(e.target.value),
                  })
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option disabled selected>
                  Limit {filterState.pageSize}
                </option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <select
                defaultValue={"all"}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilter(e.target.value as FilterType)
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value={"all"} selected>
                  All
                </option>
                <option value={"borrowed"}>Borrowed</option>
                <option value={"returned"}>Returned</option>
                <option value={"approved"}>Approved</option>
                <option value={"pending"}>Pending</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          <TransactionTable
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
            transactions={filteredTransactions}
          />
        )}
      </div>
    </div>
  );
}
