package com.react.app.controller;

import com.react.app.dto.UserResponse;
import com.react.app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user-profile")
    public ResponseEntity<UserResponse> userProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getByEmail(authentication.getName()));
    }
}
