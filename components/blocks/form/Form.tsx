"use client";

import styles from "./Form.module.scss";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input/Input";
import { Animate, Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { UI } from "@/data/ui";

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

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={UI.form.fields.name.label}
            placeholder={UI.form.fields.name.placeholder}
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
            label={UI.form.fields.phone.label}
            placeholder={UI.form.fields.phone.placeholder}
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
            label={UI.form.fields.email.label}
            placeholder={UI.form.fields.email.placeholder}
            error={errors.email?.message}
          />
        )}
      />

      <span className={styles.acceptance}>
        Нажимая на кнопку «Отправить», вы ознакомлены и подтверждаете согласие
        с <Link href="#">политикой обработки персональных данных</Link>
      </span>

      <Button className={styles.btn} type="submit" isLoading={isSubmitting}>
        <Animate>{isSubmitting ? UI.form.submitting : UI.form.submit}</Animate>
      </Button>
    </form>
  );
};

export default Form;
