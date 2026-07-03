"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal/Modal";
import Form from "@/components/blocks/form/Form";
import { UI } from "@/data/ui";

export default function FormPage() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    if (pathname === "/form") {
      router.back();
    } else {
      router.replace("/");
    }
  }, [pathname, router]);

  return (
    <Modal onClose={handleClose}>
      <Modal.Header>{UI.form.modalTitle}</Modal.Header>
      <Modal.Body>
        <Form />
      </Modal.Body>
    </Modal>
  );
}
