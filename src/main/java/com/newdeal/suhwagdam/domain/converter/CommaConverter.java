package com.newdeal.suhwagdam.domain.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;
import java.util.stream.Collectors;

@Converter
public class CommaConverter implements AttributeConverter<List<String>, String> {

    private static final String DELIMITER = ",";

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if(attribute == null || attribute.isEmpty()) return null;

        return attribute.stream().sorted().collect(Collectors.joining(DELIMITER));
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if(dbData == null || dbData.isEmpty()) return List.of();

        return List.of(dbData.split(DELIMITER));
    }
}
