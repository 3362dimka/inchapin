"use client";

import styles from "./Form.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input/input";
import { Animate, Button } from "@/components/ui/button/Button";
import Link from "next/link";

// Схема валидации Zod
const formSchema = z.object({
  name: z.string().min(1, "Имя обязательно для заполнения"),
  phone: z
    .string()
    .min(1, "Телефон обязателен для заполнения")
    .regex(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Введите корректный номер телефона",
    ),
  email: z
    .string()
    .min(1, "E-mail обязателен для заполнения")
    .email("Введите корректный e-mail адрес"),
});

type FormData = z.infer<typeof formSchema>;

const CLOSE_ANIMATION_MS = 300;

const Form = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Вывод всех полей в консоль
      console.log("=== ДАННЫЕ ФОРМЫ ===");
      console.log("Имя:", data.name);
      console.log("Телефон:", data.phone);
      console.log("E-mail:", data.email);

      reset();
    } catch (error) {
      console.error("Ошибка отправки:", error);
      alert("Произошла ошибка при отправке данных");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      if (pathname.startsWith("/form")) {
        router.back();
        return;
      }

      router.replace("/", { scroll: false });
    }, CLOSE_ANIMATION_MS);
  }, [isClosing, pathname, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || isClosing) return;

      handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, isClosing]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Ваше имя"
              placeholder="Введите ваше имя"
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Телефон"
              placeholder="+7 (___) ___-__-__"
              mask="phone"
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="E-mail"
              placeholder="example@mail.com"
              error={errors.email?.message}
            />
          )}
        />

        <span className={styles.acceptence}>
          Нажимая на кнопку «Отправить», вы ознакомлены и подтверждаете согласие
          с <Link href="#">политикой обработки персональных данных</Link>
        </span>

        <Button className={styles.btn} type="submit" isLoading={isSubmitting}>
          <Animate>{isSubmitting ? "Отправка..." : "Отправить"}</Animate>
        </Button>
      </form>
    </>
  );
};

export default Form;
