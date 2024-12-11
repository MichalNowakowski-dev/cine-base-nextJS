"use client";

import Modal from "@/app/components/ui/modal/Modal";
import { useState } from "react";
import { cancelSubscription } from "@/app/lib/actions";
export default function CancelSubscriptionModal({
  stripeSubscriptionId,
}: {
  stripeSubscriptionId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  async function handleCancel() {
    await cancelSubscription(stripeSubscriptionId);
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="text-lg text-red-700 hover:cursor-pointer"
      >
        Anuluj subskrypcje
      </button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-lg border border-white bg-black/80"
      >
        <div className="p-10 flex justify-center items-center flex-col gap-6 ">
          <h2 className="text-red-700">
            Czy na pewno chcesz anulować subskrypcję?
          </h2>
          <div className="flex w-full  justify-between text-white">
            <button
              onClick={onClose}
              className="bg-blue-500 py-2 px-6 rounded-md w-32"
            >
              Nie
            </button>
            <button
              onClick={handleCancel}
              className="bg-zinc-800 py-2 px-6 rounded-md w-32"
            >
              Tak
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
