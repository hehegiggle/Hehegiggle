package com.notificationmicroservice.service;

import com.notificationmicroservice.entity.Notification;
import com.notificationmicroservice.repository.NotificationRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;
    
    @Autowired
    private NotificationRepository notificationRepo;

    public void sendTestEmail(String to) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(to);
            String subject = "Welcome to HeHe Giggle! 🎉";
            String emailBody = "Hey User,\n\n"
                    + "\n\n Welcome to HeHe Giggle! You're officially part of our vibrant community where you can share epic fails, life updates, and more with the world. Get ready for some fun! 🎉🌟\n\n"
                    + "To get started, log in with your credentials and start exploring.\n\n"
                    + "\n\n If you have any questions or need assistance, feel free to reach out to our support team.\n\n"
                    + "Stay awesome and keep on posting!\n\n" + "\n\n Cheers,\n" + "From Team HeHe Giggle!!!";

            helper.setSubject(subject);
            helper.setText(emailBody, true);
            javaMailSender.send(mimeMessage);

            Notification notification = new Notification();
            notification.setEmail(to);
            notification.setMessage(emailBody);
            notification.setSubject(subject);
            notification.setStatus("sent");

            notificationRepo.save(notification);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
