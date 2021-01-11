import { useBooleanState } from "Common/hooks/useBooleanState";
import { useForm } from "Common/hooks/useForm";
import { Button } from "Components/controls/button/button";
import { CheckBox } from "Components/controls/checkbox/checkbox";
import { Input } from "Components/controls/Input";
import { RadioButton } from "Components/controls/radiobutton/radiobutton";
import { Select } from "Components/controls/select/select";
import React, { ChangeEvent, FC, useCallback } from "react";
import styled from "styled-components";
import { boolean, object, string } from "yup";

import { useTranslation } from "@/localization/hooks/useTranslation";

import EmailIcon from "../../icons/email.svg";
import PasswordIcon from "../../icons/password.svg";

const countries = ["Latvia", "Lebanon", "Lesotho", "Liberia", "Libya"];

interface IFormValues {
  name: string;
  email: string;
  password: string;
  country: string;
  gender: string;
  acceptPolicies: boolean;
}

const initialValues: IFormValues = {
  name: "",
  email: "",
  password: "",
  country: "",
  gender: "",
  acceptPolicies: false,
};

export const SignUpForm: FC = () => {
  const { t } = useTranslation();
  const [loading, startLoading, stopLoading] = useBooleanState();

  const validateSchema = object().shape({
    name: string().required(t("validate.name")),
    email: string().email(t("validate.email")).required(t("validate.email")),
    password: string()
      .min(6, t("validate.passwordLength", { count: 6 }))
      .required(t("validate.password")),
    country: string().required(t("validate.country")),
    gender: string().required(t("validate.gender")),
    acceptPolicies: boolean().oneOf([true], t("validate.acceptPolicies")),
  });

  const onSubmit = (formValues: IFormValues) => {
    console.log("submit");
    startLoading();
    setTimeout(() => {
      stopLoading();
      console.log("Form Values", formValues);
    }, 10000);
  };

  const {
    fieldNames,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touchedValues,
    errors,
    setFieldBlur,
    setFieldValue,
    valid,
  } = useForm(
    {
      initialValues,
      onSubmit,
      validateSchema,
      validateOnInit: true,
    },
    [],
  );

  const onChangeCountry = useCallback(
    (value, name) => {
      setFieldValue(name, value);
    },
    [setFieldValue],
  );

  const onSetGender = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;

      setFieldValue(name as any, value);
    },
    [setFieldValue],
  );

  return (
    <Form>
      <Title>{t("createNewAccount")}</Title>
      <Input
        placeholder={t("enterName")}
        name={fieldNames.name}
        defaultValue={values.name}
        touch={touchedValues.name}
        error={errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        icon={<EmailIcon />}
        placeholder={t("email")}
        name={fieldNames.email}
        defaultValue={values.email}
        touch={touchedValues.email}
        error={errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Input
        icon={<PasswordIcon />}
        placeholder={t("password")}
        name={fieldNames.password}
        defaultValue={values.password}
        touch={touchedValues.password}
        error={errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="new-password"
        type={"password"}
      />
      <Select
        items={countries}
        placeholder={t("selectCountry")}
        name={fieldNames.country}
        defaultValue={values.country}
        touch={touchedValues.country}
        error={errors.country}
        onBlur={setFieldBlur}
        onChange={onChangeCountry}
      />

      <RadioGroup>
        <StyledRadioButton
          onChange={onSetGender}
          title={t("male")}
          name={"gender"}
          value={"male"}
        />
        <StyledRadioButton
          onChange={onSetGender}
          title={t("female")}
          name={"gender"}
          value={"female"}
        />
      </RadioGroup>
      <RadioGroupError>{touchedValues.gender && errors.gender}</RadioGroupError>

      <StyledCheckBox
        name={fieldNames.acceptPolicies}
        checked={values.acceptPolicies}
        touch={touchedValues.acceptPolicies}
        error={errors.acceptPolicies}
        onBlur={handleBlur}
        onChange={handleChange}
      >
        <CheckBoxLabel>
          {`${t("accept")}`} <Link href="#">{t("terms")}</Link> {`${t("and")} `}{" "}
          <Link href="#">{t("conditions")}</Link>
        </CheckBoxLabel>
      </StyledCheckBox>

      <StyledButton
        disabled={!valid}
        loading={loading}
        onClick={handleSubmit as any}
        text={t("signUp")}
      />
    </Form>
  );
};

const Form = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 32px 29px 59px 29px;
  width: 400px;
`;

const RadioGroupError = styled.div`
  font: normal normal normal 10px/13px Roboto;
  letter-spacing: 0;
  color: #e82828;
  margin-left: 18px;
  height: 13px;
`;

const Title = styled.div`
  margin-bottom: 37px;
  text-align: center;
  font: normal normal bold 28px/34px Roboto;
  letter-spacing: 0;
  color: #222222;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;
const StyledRadioButton = styled(RadioButton)`
  margin-right: 25px;
`;

const RadioGroup = styled.div`
  margin-top: 3px;
  display: flex;
`;

const CheckBoxLabel = styled.div`
  font: normal normal normal 14px/17px Roboto;
`;

const Link = styled.a`
  text-decoration: none;
  font: normal normal normal 14px/17px Roboto;
  color: #0094ff;
`;
const StyledCheckBox = styled(CheckBox)`
  margin-top: 12px;
`;
