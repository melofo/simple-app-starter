package readFile;
import java.io.*;
import java.util.*;
import org.apache.commons.codec.language.DoubleMetaphone;


/**
 * identity possible duplicate records in the test files
 * 1. find exact duplicates
 * 2. potential duplicates could be entry with different spelling, missing data, small differences
 *
 * example:
 * bill,smith,bsmith@gmail.com, 190 main st boston mass
 * bill,smith,bsmith@gmail.com, 400 west street boston ma
 */
public class cleanFile {
    /**
     * Driver Function to read file, parse the data and write it out to another text file
     * @param args
     */
    public static void main(String[] args) {
        // initialize output file path here
        String filePathNonDuplicate = "src/readFile/non-duplicate.csv";
        String filePathDuplicate = "src/readFile/duplicate.csv";
        // scanner class for reading file input
        Scanner fileIn = null;
        try {
            // attempt to open file
            fileIn = new Scanner(new FileInputStream("src/readFile/source.txt"));
        }
        catch (FileNotFoundException e)
        {
            // if file is notfound
            System.out.println("File does not exist");
            System.exit(0);
        }
        // at this point, file is read successful
        // output list stores the record of data as a String array
        List<String[]> output = new ArrayList<>();
        // while loop splits the String into String array and adds it to output list
        while (fileIn.hasNextLine()) {
            String temp = fileIn.nextLine();
            String[] split = temp.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
            output.add(split);
        }
        // metaphone class tests the similarity of 2 words in phonetic sound
        DoubleMetaphone meta = new DoubleMetaphone();
        int i = 0;
        appendToFile(filePathDuplicate, output.get(0));
        while (i < output.size()) {
            // if i is at the last one, we just add it
            if (i == output.size() - 1) {
                appendToFile(filePathNonDuplicate, output.get(i));
                break;
            }
            int j = i + 1;
            // compare first i and j to see if they are similar first before advancing.
            String name1 = output.get(i)[1] + " " + output.get(i)[2];
            String name2 = output.get(j)[1] + " " + output.get(j)[2];
            int leveshtein = distance(name1, name2);
            boolean similarName = meta.isDoubleMetaphoneEqual(name1, name2);
            // if the i and j are the same OR similar sounding, then we check for duplicates
            if (leveshtein == 0 || similarName) {
                appendToFile(filePathDuplicate, output.get(i));
                List<String[]> tempResult = new ArrayList<>();
                tempResult.add(output.get(i));
                while((distance(name1, output.get(j)[1] + " " + output.get(j)[2]) == 0  || meta.isDoubleMetaphoneEqual(name1, output.get(j)[1] + " " + output.get(j)[2]) )
                        && (j < output.size()) ) {
                    tempResult.add(output.get(j));
                    appendToFile(filePathDuplicate, output.get(j));
                    j++;
                }
                // tempResult stores all the duplicates and pass it into the funciton mostData
                // the String array with most data is returned and appended to output.txt
                String[] better = mostData(tempResult);
                appendToFile(filePathNonDuplicate, better);
                i = j;
                continue;
            }
            // if anything else, append the current line to output.txt
            appendToFile(filePathNonDuplicate, output.get(i));
            i = j;
        }
    }
    /**
     * method returns the String array with the most data input (i.e. the one with less blank space)
     * @param input list of String[] arrays, each representing a record from CSV
     * @return one String[] array that has the most data
     */
    public static String[] mostData(List<String[]> input) {
        Map<String[], Integer> map = new HashMap<>();
        for (String[] x : input) {
            int count = 0;
            for (int i = 0; i < x.length; i++) {
                if (!x[i].equals("")) {
                    count++;
                }
            }
            map.put(x, count);
        }
        Collections.sort(input, (a,b) -> map.get(b) - map.get(a));
        // least empty spaces comes first (more data)
        return input.get(0);
    }
    /**
     * utitlity function for appendToFile method
     * writes the following string to the File f
     * @param s String to write
     * @param f file
     * @throws IOException
     */
    public static void write(String s, File f) throws IOException {
        FileWriter fw = new FileWriter(f, true);
        fw.write(s);
        fw.close();
    }
    /**
     * method to write the following String[] array and APPEND it to the file in filePath
     * @param filePath string representation of the file path
     * @param input the String[] array to append to output file
     */
    public static void appendToFile(String filePath, String[] input) {
        try{
            File f = new File(filePath);
            String out = Arrays.toString(input).replace("[", "").replace("]", "");
            write(out + "\n", f);
        }
        catch (IOException e)
        {
            System.out.println("Error writing file. File may not exist");
            System.exit(0);
        }
    }
    /**
     * calculates the Levenshtein distance between 2 string. the higher the Levenshtein distance, the more different the strings are
     * @param a
     * @param b
     * @return Levenshtein distance
     */
    public static int distance(String a, String b) {
        a = a.toLowerCase();
        b = b.toLowerCase();
        int [] costs = new int [b.length() + 1];
        for (int j = 0; j < costs.length; j++)
            costs[j] = j;
        for (int i = 1; i <= a.length(); i++) {
            costs[0] = i;
            int nw = i - 1;
            for (int j = 1; j <= b.length(); j++) {
                int cj = Math.min(1 + Math.min(costs[j], costs[j - 1]), a.charAt(i - 1) == b.charAt(j - 1) ? nw : nw + 1);
                nw = costs[j];
                costs[j] = cj;
            }
        }
        return costs[b.length()];
    }
}
