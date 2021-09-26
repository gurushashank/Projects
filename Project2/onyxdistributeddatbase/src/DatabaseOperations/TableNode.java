package DatabaseOperations;

import java.util.ArrayList;
import java.util.List;

public class TableNode {

    private String tableName;
    private String primaryKey;
    private String foreignKey;
    private List<String> tableElements = new ArrayList<>();

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(String primaryKey) {
        this.primaryKey = primaryKey;
    }

    public String getForeignKey() {
        return foreignKey;
    }

    public void setForeignKey(String foreignKey) {
        this.foreignKey = foreignKey;
    }

    public List<String> getTableElements() {
        return tableElements;
    }

    public void setTableElements(List<String> tableElements) {
        this.tableElements = tableElements;
    }
}
