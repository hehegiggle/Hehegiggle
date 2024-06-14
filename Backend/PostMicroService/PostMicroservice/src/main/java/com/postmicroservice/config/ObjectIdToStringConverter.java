package com.postmicroservice.config;

import org.bson.types.ObjectId;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

@ReadingConverter
public class ObjectIdToStringConverter implements Converter<ObjectId, String> {
    @Override
    public String convert(ObjectId source) {
        return source.toHexString(); // Returns the hexadecimal string representation of the ObjectId
    }
}