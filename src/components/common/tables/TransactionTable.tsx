import { Transaction } from "@/types/Transactions";
import { formatDate, formatDateTime } from "@/utils/Dates";
import { Button } from "../Button";
import { useAlert } from "@/contexts/AlertContext";
import { useRef, useState } from "react";
import { ErrorResponse, Response } from "@/types/Models";
import { RequestState } from "@/api/common";
import { ADMIN_API } from "@/utils/Api";
import { AxiosError, AxiosResponse } from "axios";
import { AlertModalRef } from "@/components/common/AlertModal.tsx";
import DeleteTransactionAlertModal from "@/components/common/alert/DeleteTransactionAlertModal.tsx";
import ConditionImageModal from "@/components/modals/ConditionImageModal";
import { ModalRef } from "../Modal";
import NotifyMessageModal from "@/components/modals/NotifyMessageModal";
import ReviewTransactionModal from "@/components/modals/ReviewTransactionModal";
import ReturnProofTransactionModal from "@/components/modals/ReturnProofTransactionModal.tsx";
import { isAdmin } from "@/types/Role";
import { useAuth } from "@/contexts/AuthContext";

interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (transaction: Transaction) => void;
  onUpdate: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  onDelete,
  onUpdate,
}: TransactionTableProps) {
  const [state, setState] = useState<RequestState<Response>>({
    loading: false,
    error: null,
    data: null,
  });
  const { showAlert } = useAlert();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>(
    transactions[0]
  );

  const { currentUser } = useAuth();

  const reviewTransactionModal = useRef<ModalRef>(null);
  const deleteModalRef = useRef<AlertModalRef>(null);
  const conditionImageModalRef = useRef<ModalRef>(null);
  const notifyModalRef = useRef<ModalRef>(null);
  const returnProofRef = useRef<ModalRef>(null);

  const isPendingColor = "bg-yellow-200 text-yellow-800";
  const isApprovedColor = "bg-blue-200 text-blue-800";
  const isReturnedColor = "bg-green-200 text-green-800";
  const isOngoingColor = "bg-red-200 text-red-800";

  async function handleDeleteTransaction() {
    setState({ error: null, data: null, loading: true });
    await ADMIN_API.delete(`/transactions/${selectedTransaction.id}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: AxiosResponse<Response>) => {
        setState({ error: null, data: response.data, loading: false });
        showAlert("Transaction deleted successfully", "success");
        onDelete(selectedTransaction);
        deleteModalRef.current?.close();
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
    setSelectedTransaction(transaction);
    deleteModalRef.current?.open();
  }

  function handleConditionImage(transaction: Transaction) {
    setSelectedTransaction(transaction);
    conditionImageModalRef.current?.open();
  }

  function handleNotifyUser(transaction: Transaction) {
    setSelectedTransaction(transaction);
    notifyModalRef.current?.open();
  }

  function handleEdit(transaction: Transaction) {
    setSelectedTransaction(transaction);
    reviewTransactionModal.current?.open();
  }

  function handleReturnProof(transaction: Transaction) {
    setSelectedTransaction(transaction);
    returnProofRef.current?.open();
  }

  function isNotifying(isNotifying: boolean) {
    setState({ error: null, data: null, loading: isNotifying });
  }

  function isPending(transaction: Transaction): boolean {
    return (
      transaction.returnedAt !== null &&
      !transaction.approved &&
      transaction.conditionImage !== null
    );
  }

  function isApproved(transaction: Transaction): boolean {
    return (
      transaction.approved &&
      transaction.returnedAt !== null &&
      transaction.conditionImage !== null
    );
  }

  function isReturned(transaction: Transaction): boolean {
    return transaction.returnedAt !== null;
  }

  function isBorrowed(transaction: Transaction): boolean {
    return (
      transaction.returnedAt === null && transaction.conditionImage === null
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className={"text-center"}>Transaction No.</th>
            <th className={"text-center"}>ID No.</th>
            <th className={"text-center"}>Borrower Name</th>
            <th className={"text-center"}>Equipment Name</th>
            <th className={"text-center"}>Purpose</th>
            <th className={"text-center"}>Borrowed Date</th>
            {isAdmin(currentUser?.roles) && (
              <th className={"text-center"}>Submitted Image</th>
            )}
            {isAdmin(currentUser?.roles) && (
              <th className={"text-center"}>Proof of Return</th>
            )}
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
                <th>{transaction.user?.idNumber ?? "No ID number"}</th>
                <td>{transaction.user?.fullName}</td>
                <td>{transaction.equipment?.name ?? "N/A"}</td>
                <td>{transaction.purpose}</td>
                <td>{formatDateTime(transaction.borrowDate)}</td>
                {isAdmin(currentUser?.roles) && (
                  <>
                    <td>
                      {transaction.conditionImage ? (
                        <Button
                          variant={"warning"}
                          rounded={"default"}
                          loading={state.loading}
                          size={"default"}
                          onClick={() => handleConditionImage(transaction)}
                        >
                          View Image
                        </Button>
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>
                      {transaction.returnProofImage ? (
                        <Button
                          variant={"info"}
                          rounded={"default"}
                          loading={state.loading}
                          size={"default"}
                          onClick={() => handleReturnProof(transaction)}
                        >
                          View Image
                        </Button>
                      ) : (
                        "No submitted image"
                      )}
                    </td>
                  </>
                )}
                <td>{formatDateTime(transaction.returnDate)}</td>
                <td>
                  {transaction.returnedAt
                    ? formatDate(transaction.returnedAt)
                    : "Not yet returned"}
                </td>
                <td className="">
                  {isPending(transaction) && (
                    <span
                      className={`block my-1 px-2 py-1 rounded-full text-xs font-semibold ${isPendingColor}`}
                    >
                      Pending
                    </span>
                  )}
                  {isApproved(transaction) && (
                    <span
                      className={`block my-1 px-2 py-1 rounded-full text-xs font-semibold ${isApprovedColor}`}
                    >
                      Approved
                    </span>
                  )}
                  {isReturned(transaction) && (
                    <span
                      className={`block my-1 px-2 py-1 rounded-full text-xs font-semibold ${isReturnedColor}`}
                    >
                      Returned
                    </span>
                  )}
                  {isBorrowed(transaction) && (
                    <span
                      className={`block my-1 px-2 py-1 rounded-full text-xs font-semibold ${isOngoingColor}`}
                    >
                      Borrowed
                    </span>
                  )}
                </td>
                <td className="gap-1 md:gap-3 flex">
                  {isReturned(transaction) && isAdmin(currentUser?.roles) && (
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
                  {isPending(transaction) && isAdmin(currentUser?.roles) && (
                    <Button
                      variant={"warning"}
                      rounded={"default"}
                      loading={state.loading}
                      onClick={() => handleEdit(transaction)}
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Button>
                  )}
                  {isBorrowed(transaction) && isAdmin(currentUser?.roles) && (
                    <div className="w-full flex gap-2">
                      <Button
                        variant={"warning"}
                        rounded={"default"}
                        loading={state.loading}
                        onClick={() => handleNotifyUser(transaction)}
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
                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                          />
                        </svg>
                      </Button>
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
          <ConditionImageModal
            ref={conditionImageModalRef}
            transaction={selectedTransaction}
          />
          <NotifyMessageModal
            ref={notifyModalRef}
            transaction={selectedTransaction}
            onNotifying={isNotifying}
          />
          <ReviewTransactionModal
            onUpdate={onUpdate}
            ref={reviewTransactionModal}
            transaction={selectedTransaction}
          />
          <ReturnProofTransactionModal
            ref={returnProofRef}
            transaction={selectedTransaction}
          />
        </>
      )}
    </div>
  );
}
