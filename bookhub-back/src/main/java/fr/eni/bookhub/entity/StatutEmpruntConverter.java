package fr.eni.bookhub.converter;

import fr.eni.bookhub.entity.StatutEmprunt;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatutEmpruntConverter
        implements AttributeConverter<StatutEmprunt, String> {

    @Override
    public String convertToDatabaseColumn(StatutEmprunt statut) {
        if (statut == null) {
            return null;
        }

        return statut.getValeurSql();
    }

    @Override
    public StatutEmprunt convertToEntityAttribute(String valeurSql) {
        if (valeurSql == null) {
            return null;
        }

        return StatutEmprunt.depuisValeurSql(valeurSql);
    }
}