import { Injectable } from "@angular/core";
import { alertService } from "./index";

export interface Error {
  eng: string;
  rus: string;
}

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  private ChangeSuperAdminPassword: Error = {
    eng: "change super admin password",
    rus: "Смените пароль",
  };
  private NotFound: Error = { eng: "not found", rus: "не найден" };
  private LoginOrPasswordIsEmpty: Error = {
    eng: "login or password is empty",
    rus: "Заполните логин и пароль",
  };
  private WrongLoginOrPassword: Error = {
    eng: "wrong password or login",
    rus: "Неверный логин или пароль",
  };
  private TokenEmpty: Error = { eng: "token empty", rus: "Вы не авторизованы" };
  private TokenForbidden: Error = {
    eng: "token forbidden",
    rus: "Доступ запрещен",
  };
  private APIForbidden: Error = {
    eng: "api forbidden for user",
    rus: "Доступ для пользователя запрещен",
  };
  private SelfChangeState: Error = {
    eng: "you want self change state you are silly",
    rus: "Вы не можете менять состояние собственного аккаунта",
  };
  private SelfDelete: Error = {
    eng: "you want self delete you are silly",
    rus: "Вы не можете удалить собственный аккаунт",
  };
  private Deactivated: Error = {
    eng: "you are deactivated",
    rus: "Учётная запись была деактивирована",
  };
  private UserIsPresentInBase: Error = {
    eng: "user almost present in database",
    rus: "Пользователь под данным логином уже существует",
  };
  private LowerCaseIsMissing: Error = {
    eng: "lowercase letter missing",
    rus: "Пароль должен содержать минимум 1 строчную букву",
  };
  private UpperCaseIsMissing: Error = {
    eng: "uppercase letter missing",
    rus: "Пароль должен содержать минимум заглавную букву",
  };
  private AtLeastOneNumericCharacterRequired: Error = {
    eng: "at least one numeric character required",
    rus: "Пароль должеть содержать минимум 1 цифру",
  };
  private SpecialCharacterMissing: Error = {
    eng: "special character missing",
    rus: "Пароль должен содержать минимум 1 спец.символ",
  };
  private WrongParams: Error = {
    eng: "wrong params",
    rus: "Неверный параметр",
  };
  private SuperAdminNeverDie: Error = {
    eng: "super admin never die",
    rus: "Суперпользователь не может быть удалён",
  };
  private CheckGroupPermissionsInConfigFile: Error = {
    eng: "check group permissions in config file",
    rus: "Проворьте ",
  };
  private EmptyName: Error = {
    eng: "empty name, required",
    rus: "Название отсутствует",
  };
  private EmptyID: Error = { eng: "empty id, required", rus: "ID отсутствует" };
  private EmptyConfigID: Error = {
    eng: "empty config id, required",
    rus: "ID отсутствует",
  };
  private EmptyGroupID: Error = {
    eng: "empty group id, required",
    rus: "ID отсутствует",
  };
  private NotEmptyConfig: Error = {
    eng: "not empty config, some devices have this config",
    rus: "Невозможно удалить. Конфигурация используется устройствами",
  };
  private NotEmptyGroup: Error = {
    eng: "not empty group, some devices in this group, move devices before remove group",
    rus: "Невозможно удалить. Группа содержит устройства",
  };

  public error = "";
  public Errors: Error[] = [];

  constructor(private alert: alertService) {
    this.Errors.push(this.ChangeSuperAdminPassword);
    this.Errors.push(this.NotFound);
    this.Errors.push(this.LoginOrPasswordIsEmpty);
    this.Errors.push(this.WrongLoginOrPassword);
    this.Errors.push(this.TokenEmpty);
    this.Errors.push(this.TokenForbidden);
    this.Errors.push(this.APIForbidden);
    this.Errors.push(this.SelfChangeState);
    this.Errors.push(this.SelfDelete);
    this.Errors.push(this.Deactivated);
    this.Errors.push(this.UserIsPresentInBase);
    this.Errors.push(this.LowerCaseIsMissing);
    this.Errors.push(this.UpperCaseIsMissing);
    this.Errors.push(this.AtLeastOneNumericCharacterRequired);
    this.Errors.push(this.SpecialCharacterMissing);
    this.Errors.push(this.WrongParams);
    this.Errors.push(this.SuperAdminNeverDie);
    this.Errors.push(this.CheckGroupPermissionsInConfigFile);
    this.Errors.push(this.EmptyName);
    this.Errors.push(this.EmptyID);
    this.Errors.push(this.EmptyConfigID);
    this.Errors.push(this.EmptyGroupID);
    this.Errors.push(this.NotEmptyConfig);
    this.Errors.push(this.NotEmptyGroup);
  }

  errorCatch(error: string) {
    this.Errors.map((err) => {
      if (error === err.eng) {
        this.error = err.rus;
        this.alert.show({
          title: err.eng,
          content: err.rus,
        });
        console.log(this.error);
      }
    });
  }
}
