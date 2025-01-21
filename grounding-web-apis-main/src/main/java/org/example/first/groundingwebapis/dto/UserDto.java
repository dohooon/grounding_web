package org.example.first.groundingwebapis.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserDto {

    private Long userId;
    private String email;
    private String password;
    private String phoneNumber;
    private String name;

    @Builder
    public UserDto(
            Long userId,
            String email,
            String password,
            String phoneNumber,
            String name) {
        this.userId = userId;
        this.email = email != null ? email : "";
        this.password = password != null ? password : "";
        this.phoneNumber = phoneNumber != null ? phoneNumber : "";
        this.name = name != null ? name : "";
    }


    @Data
    @Builder
    @NoArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class GetResponse{}
    @Data
    @Builder
    @NoArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ReadResponse{}

    @Getter
    @Setter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class SignUpRequestDto {

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", message = "유효하지 않은 이메일입니다. 재시도해주세요.")
        private String email;

        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>])[\\S]{8,}$", message = "유효하지 않은 비밀번호(8자리 이상, 특수 문자 최소 하나 포함)입니다. 재시도해주세요.")
        private String password;

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,10}$", message = "유효하지 않은 닉네임(2자리 이상 10자리 사이이며 특수 문자 미포함)입니다. 재시도해주세요.")
        private String name;

        @NotBlank
        @Pattern(regexp = "^01[016-9]\\d{8}$", message = "유효하지 않은 전화번호입니다. 재시도해주세요.")
        private String phoneNumber;

        @NotBlank
        private String walletAddress;

    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class SignUpResponseDto{
        private Long userId;
        private LocalDateTime createdAt;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class LoginRequestDto{
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", message = "유효하지 않은 이메일입니다. 재시도해주세요.")
        private String email;
        @NotBlank
        @Pattern(regexp = "^(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$", message = "유효하지 않은 비밀번호(8자리 이상 20자리 이하이며 특수 문자 최소 하나 포함)입니다. 재시도해주세요.")
        private String password;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class LoginResponseDto{
        private Long userId;
        private LocalDateTime createdAt;
        private String accessToken;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class UserMyProfileInfoResponseDto{
        private Long userId;

        private String name;
        private String statusMessage;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class CheckDuplicatedEmailRequestDto{
        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", message = "유효하지 않은 이메일입니다. 재시도해주세요.")
        private String email;
    }


    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class UpdatePhoneNumberRequestDto{
        @NotBlank
        @Pattern(regexp = "^01[016-9]\\d{8}$", message = "유효하지 않은 전화번호입니다. 재시도해주세요.")
        private String phoneNumber;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class GetPhoneNumberResponseDto{
        private Long userId;
        private String phoneNumber;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class GetEmailResponseDto{
        private Long userId;
        private String email;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class ValidatePasswordRequestDto{
        @NotBlank
        @Pattern(regexp = "^(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$", message = "유효하지 않은 비밀번호(8자리 이상 20자리 이하이며 특수 문자 최소 하나 포함)입니다. 재시도해주세요.")
        private String password;
    }


    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class GetUserIdRequestDto {
        private String email;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class GetUserIdResponseDto {
        private Long userId;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class GetWalletAddressResponseDto {
        private Long userId;
        private String walletAddress;
    }

    @Getter
    @Builder @NoArgsConstructor @AllArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class SetPropertyResponseDto{
        private Long propertyId;
    }

}
