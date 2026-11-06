package com.react.app.controller;

import com.react.app.dto.AuthResponse;
import com.react.app.dto.LoginRequest;
import com.react.app.dto.RegisterRequest;
import com.react.app.dto.UserResponse;
import com.react.app.service.AuthService;
import com.react.app.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
//    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request){
//        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
//    }
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        userService.register(request);   // this saves the user
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

}
