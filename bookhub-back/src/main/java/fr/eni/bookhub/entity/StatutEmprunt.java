package fr.eni.bookhub.entity;

public enum StatutEmprunt {
    EN_COURS("EN COURS"),
    EN_RETARD("EN RETARD"),
    RETOURNE("RETOURNE");

    private final String valeurSql;

    StatutEmprunt(String valeurSql) {
        this.valeurSql = valeurSql;
    }

    public String getValeurSql() {
        return valeurSql;
    }

    public static StatutEmprunt depuisValeurSql(String valeurSql) {
        for (StatutEmprunt statut : values()) {
            if (statut.valeurSql.equals(valeurSql)) {
                return statut;
            }
        }

        throw new IllegalArgumentException(
                "Statut d'emprunt inconnu : " + valeurSql
        );
    }
}
