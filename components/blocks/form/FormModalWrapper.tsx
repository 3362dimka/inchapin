"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal/Modal";
import Form from "@/components/blocks/form/Form";
import { UI } from "@/data/ui";

export function FormModalWrapper() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.push("/")}>
      <Modal.Header>{UI.form.modalTitle}</Modal.Header>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal>
  );
}
