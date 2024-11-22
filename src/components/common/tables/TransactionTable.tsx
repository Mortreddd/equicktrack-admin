import { Transaction } from "@/types/Transactions";
import { formatDate, formatDateTime } from "@/utils/Dates";
import { Button } from "../Button";
import { useAlert } from "@/contexts/AlertContext";
import {useRef, useState} from "react";
import { ErrorResponse, Response } from "@/types/Models";
import { RequestState } from "@/api/common";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import {AlertModalRef} from "@/components/common/AlertModal.tsx";
import DeleteTransactionAlertModal from "@/components/common/alert/DeleteTransactionAlertModal.tsx";

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const [state, setState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });
  const { showAlert } = useAlert();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(transactions[0]);
  const deleteModalRef = useRef<AlertModalRef>(null);

  const isPendingColor = "bg-yellow-200 text-yellow-800";
  const isApprovedColor = "bg-blue-200 text-blue-800";
  const isReturnedColor = "bg-green-200 text-green-800";
  const isOngoingColor = "bg-red-200 text-red-800";

  async function handleDeleteTransaction() {
    setState({error: null, data: null, loading: true});
    await ADMIN_API.delete(`/transactions/${selectedTransaction.id}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
        .then((response: AxiosResponse<Response>) => {
          setState({error: null, data: response.data, loading: false});
          showAlert("Transaction deleted successfully", "success");
        })
        .catch((error: AxiosError<ErrorResponse>) => {
          setState({
            error: error.response?.data.message,
            data: null,
            loading: false,
          });
          showAlert(
              error.response?.data.message ?? "Something went wrong",
              "error"
          );
        });
  }

  function handleDelete(transaction: Transaction) {
    setSelectedTransaction(transaction)
    deleteModalRef.current?.open()
  }

  function handleColor(transaction: Transaction): string {
    if (isPending(transaction)) return isPendingColor;
    else if (isApproved(transaction)) return isApprovedColor;
    else if (isReturned(transaction)) return isReturnedColor;
    else if (isOngoing(transaction)) return isOngoingColor;
    return isPendingColor;
  }

  function handleText(transaction: Transaction): string {
    if (isPending(transaction)) return "Pending";
    else if (isApproved(transaction)) return "Approved";
    else if (isReturned(transaction)) return "Returned";
    else if (isOngoing(transaction)) return "Ongoing";
    return "Pending";
  }

  function isPending(transaction: Transaction): boolean {
    return (
      transaction.returnedAt === null &&
      !transaction.approved &&
      transaction.conditionImage !== null
    );
  }

  function isApproved(transaction: Transaction): boolean {
    return transaction.approved && transaction.returnedAt !== null;
  }

  function isReturned(transaction: Transaction): boolean {
    return transaction.returnedAt !== null;
  }

  function isOngoing(transaction: Transaction): boolean {
    return transaction.returnedAt === null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className={"text-center"}>Transaction No.</th>
            <th className={"text-center"}>Equipment Name</th>
            <th className={"text-center"}>Purpose</th>
            <th className={"text-center"}>Borrower Name</th>
            <th className={"text-center"}>Borrowed Date</th>
            <th className={"text-center"}>Submitted Image</th>
            <th className={"text-center"}>Expected Return Date</th>
            <th className={"text-center"}>Returned Date</th>
            <th className={"text-center"}>Status</th>
            <th className={"text-center"}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={10} className="h-20 text-center">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((transaction, key) => (
              <tr key={key} className="hover">
                <th>{transaction.id}</th>
                <td>{transaction.equipment?.name}</td>
                <td>{transaction.purpose}</td>
                <td>{transaction.user?.fullName}</td>
                <td>{formatDateTime(transaction.borrowDate)}</td>
                <td>
                  {transaction.conditionImage ? (
                    <img
                      src={transaction.conditionImage}
                      alt="submitted"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{formatDateTime(transaction.returnDate)}</td>
                <td>
                  {transaction.returnedAt
                    ? formatDate(transaction.returnedAt)
                    : "Not yet returned"}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${handleColor(
                      transaction
                    )}`}
                  >
                    {handleText(transaction)}
                  </span>
                </td>
                <td className="flex-1">
                  {(isReturned(transaction) || isApproved(transaction)) && (
                    <div className="w-full flex gap-2">
                      <Button
                        variant={"danger"}
                        rounded={"default"}
                        loading={state.loading}
                        onClick={() => handleDelete(transaction)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedTransaction && (
          <>
            <DeleteTransactionAlertModal
                ref={deleteModalRef}
                loading={state.loading}
                onConfirm={() => handleDeleteTransaction()}
                transaction={selectedTransaction}
                type={"danger"}
            />
          </>
      )}
    </div>
  );
}
