package com.newdeal.suhwagdam.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MailSendService {
    private final JavaMailSenderImpl mailSenderImpl;
    private final HttpServletRequest request; // TODO 서버 연결시 변경 필요

    public void sendEmailForCertification(String email, String certificationToken) throws MessagingException {
        String content = String.format("http://%s:3000/confirm?certificationToken=%s&email=%s   링크를 5분 이내에 클릭해주세요.", request.getServerName(), certificationToken, email);
        sendMail(email,"[수확담] 이메일 인증", content);
    }

    private void sendMail(String email, String subject, String content) throws MessagingException {
        MimeMessage mimeMessage = mailSenderImpl.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content);
        mailSenderImpl.send(mimeMessage);
    }
}
