const nlm = `<?xml version="1.0" encoding="utf-8"?>
<style xmlns="http://purl.org/net/xbiblio/csl" class="in-text" version="1.0" demote-non-dropping-particle="sort-only" default-locale="en-US">
  <info>
    <title>National Library of Medicine (grant proposals with PMCID/PMID)</title>
    <title-short>NLM</title-short>
    <id>http://www.zotero.org/styles/national-library-of-medicine-grant-proposals</id>
    <link href="http://www.zotero.org/styles/national-library-of-medicine-grant-proposals" rel="self"/>
    <link href="http://www.nlm.nih.gov/pubs/formats/recommendedformats1991-full.pdf" rel="documentation"/>
    <link href="http://publicaccess.nih.gov/citation_methods.htm" rel="documentation"/>
    <link href="http://grants.nih.gov/grants/funding/424/SF424_RR_Guide_General_Adobe_VerC.pdf" rel="documentation"/>
    <link href="http://grants.nih.gov/grants/funding/phs398/phs398.pdf" rel="documentation"/>
    <link href="http://www.ncbi.nlm.nih.gov/books/NBK7260/#A41037" rel="documentation"/>
    <author>
      <name>Michael Berkowitz</name>
      <email>mberkowi@gmu.edu</email>
    </author>
    <contributor>
      <name>Sebastian Karcher</name>
    </contributor>
    <contributor>
      <name>Matt Tracy</name>
    </contributor>
    <category citation-format="numeric"/>
    <category field="medicine"/>
    <summary>Adds required PMCID, or if absent adds optional PMID from extra field in bibliography</summary>
    <updated>2016-09-29T14:40:35+00:00</updated>
    <rights license="http://creativecommons.org/licenses/by-sa/3.0/">This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 License</rights>
  </info>
  <locale xml:lang="en">
    <terms>
      <term name="presented at">presented at</term>
      <term name="retrieved">available</term>
      <term name="section" form="short">sect.</term>
    </terms>
  </locale>
  <macro name="author">
    <names variable="author">
      <name sort-separator=" " initialize-with="" name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
      <label form="long" prefix=", "/>
      <substitute>
        <names variable="editor"/>
      </substitute>
    </names>
  </macro>
  <macro name="editor">
    <group delimiter=": ">
      <choose>
        <if type="chapter paper-conference" match="any">
          <text term="in" text-case="capitalize-first"/>
        </if>
      </choose>
      <names variable="editor" suffix=".">
        <name sort-separator=" " initialize-with="" name-as-sort-order="all" delimiter=", " delimiter-precedes-last="always"/>
        <label form="long" prefix=", "/>
      </names>
    </group>
  </macro>
  <macro name="publisher">
    <group delimiter=": " suffix=";">
      <choose>
        <if type="thesis">
          <text variable="publisher-place" prefix="[" suffix="]"/>
        </if>
        <else-if type="speech"/>
        <else>
          <text variable="publisher-place"/>
        </else>
      </choose>
      <text variable="publisher"/>
    </group>
  </macro>
  <macro name="access">
    <choose>
      <if variable="URL">
        <group delimiter=": ">
          <group delimiter=" ">
            <text term="retrieved" text-case="capitalize-first"/>
            <text term="from"/>
          </group>
          <text variable="URL"/>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="accessed-date">
    <choose>
      <if variable="URL">
        <group prefix="[" suffix="]" delimiter=" ">
          <text term="cited"/>
          <date variable="accessed">
            <date-part name="year"/>
            <date-part name="month" prefix=" " form="short" strip-periods="true"/>
            <date-part name="day" prefix=" "/>
          </date>
        </group>
      </if>
    </choose>
  </macro>
  <macro name="container-title">
    <choose>
      <if type="article-journal article-magazine chapter paper-conference article-newspaper" match="any">
        <group suffix="." delimiter=" ">
          <text variable="container-title" form="short" strip-periods="true"/>
          <choose>
            <if variable="URL">
              <text term="internet" prefix="[" suffix="]" text-case="capitalize-first"/>
            </if>
          </choose>
        </group>
        <text macro="edition" prefix=" "/>
      </if>
      <!--add event-name and event-place once they become available-->
      <else-if type="bill legislation" match="any">
        <group delimiter=", ">
          <group delimiter=". ">
            <text variable="container-title"/>
            <group delimiter=" ">
              <text term="section" form="short" text-case="capitalize-first"/>
              <text variable="section"/>
            </group>
          </group>
          <text variable="number"/>
        </group>
      </else-if>
      <else-if type="speech">
        <group delimiter=": " suffix=";">
          <group delimiter=" ">
            <text variable="genre" text-case="capitalize-first"/>
            <text term="presented at"/>
          </group>
          <text variable="event"/>
        </group>
      </else-if>
      <else>
        <text variable="container-title" suffix="."/>
      </else>
    </choose>
  </macro>
  <macro name="title">
    <text variable="title"/>
    <choose>
      <if type="article-journal article-magazine chapter paper-conference article-newspaper" match="none">
        <choose>
          <if variable="URL">
            <text term="internet" prefix=" [" suffix="]" text-case="capitalize-first"/>
          </if>
        </choose>
        <text macro="edition" prefix=". "/>
      </if>
    </choose>
    <choose>
      <if type="thesis">
        <text variable="genre" prefix=" [" suffix="]"/>
      </if>
    </choose>
  </macro>
  <macro name="edition">
    <choose>
      <if is-numeric="edition">
        <group delimiter=" ">
          <number variable="edition" form="ordinal"/>
          <text term="edition" form="short"/>
        </group>
      </if>
      <else>
        <text variable="edition" suffix="."/>
      </else>
    </choose>
  </macro>
  <macro name="date">
    <choose>
      <if type="article-journal article-magazine article-newspaper" match="any">
        <group suffix=";" delimiter=" ">
          <date variable="issued" delimiter=" ">
            <date-part name="year"/>
            <date-part name="month" form="short" strip-periods="true"/>
            <date-part name="day"/>
          </date>
          <text macro="accessed-date"/>
        </group>
      </if>
      <else-if type="bill legislation" match="any">
        <group delimiter=", ">
          <date variable="issued" delimiter=" ">
            <date-part name="month" form="short" strip-periods="true"/>
            <date-part name="day"/>
          </date>
          <date variable="issued">
            <date-part name="year"/>
          </date>
        </group>
      </else-if>
      <else-if type="report">
        <date variable="issued" delimiter=" ">
          <date-part name="year"/>
          <date-part name="month" form="short" strip-periods="true"/>
        </date>
      </else-if>
      <else-if type="patent">
        <group suffix=".">
          <group delimiter=", ">
            <text variable="number"/>
            <date variable="issued">
              <date-part name="year"/>
            </date>
          </group>
          <text macro="accessed-date" prefix=" "/>
        </group>
      </else-if>
      <else-if type="speech">
        <group delimiter="; ">
          <date variable="issued" delimiter=" ">
            <date-part name="year"/>
            <date-part name="month" form="short" strip-periods="true"/>
            <date-part name="day"/>
          </date>
          <text variable="event-place"/>
        </group>
      </else-if>
      <else>
        <group suffix=".">
          <date variable="issued">
            <date-part name="year"/>
          </date>
          <text macro="accessed-date" prefix=" "/>
        </group>
      </else>
    </choose>
  </macro>
  <macro name="pages">
    <choose>
      <if type="article-journal article-magazine article-newspaper" match="any">
        <text variable="page" prefix=":"/>
      </if>
      <else>
        <text variable="page" prefix=" p. "/>
      </else>
    </choose>
  </macro>
  <macro name="pmcid">
    <text variable="PMCID" prefix=" PMCID: "/>
    <choose>
      <if variable="PMCID" match="none">
        <text variable="PMID" prefix=" PMID: "/>
      </if>
    </choose>
  </macro>
  <macro name="journal-location">
    <choose>
      <if type="article-journal article-magazine" match="any">
        <text variable="volume"/>
        <text variable="issue" prefix="(" suffix=")"/>
      </if>
    </choose>
  </macro>
  <macro name="report-details">
    <choose>
      <if type="report">
        <text variable="number" prefix="Report No.: "/>
      </if>
    </choose>
  </macro>
  <citation collapse="citation-number">
    <sort>
      <key variable="citation-number"/>
    </sort>
    <layout vertical-align="sup" delimiter=",">
      <text variable="citation-number"/>
    </layout>
  </citation>
  <bibliography second-field-align="flush">
    <layout>
      <text variable="citation-number" suffix=". "/>
      <group delimiter=". " suffix=". ">
        <text macro="author"/>
        <text macro="title"/>
      </group>
      <group delimiter=" " suffix=". ">
        <text macro="editor"/>
        <text macro="container-title"/>
        <text macro="publisher"/>
        <group>
          <text macro="date"/>
          <text macro="journal-location"/>
          <text macro="pages"/>
        </group>
      </group>
      <text macro="report-details" suffix=". "/>
      <text macro="access"/>
      <text macro="pmcid"/>
    </layout>
  </bibliography>
</style>`;

export default nlm;
